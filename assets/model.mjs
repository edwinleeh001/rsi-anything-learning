export const DEFAULTS=Object.freeze({preset:'misleading',lambda:0,eta:0.5,pairPass:true});
const labels=['A','B','C','D'];
export function executeToyPatch(id,n=4){
 const original=n;let total=0;
 if(id==='A'||id==='B'){while(n>0){total+=n;n-=id==='A'?2:1}}
 else if(id==='C')total=n*n;
 else if(id==='D')total=n*(n+1)/2;
 else throw new Error('Unknown toy patch');
 const expected=original*(original+1)/2;return{result:total,expected,pass:Number(total===expected)};
}
export function computeTrace(params={}){
 const p={...DEFAULTS,...params};
 const presets={misleading:[.86,.68,.35,.53],aligned:[.22,.84,.32,.66],cautious:[.85,.73,.39,.64]};
 const probabilities=presets[p.preset]||presets.misleading;
 const uncertainty=p.preset==='cautious'?[.40,.05,.10,.09]:[.08,.12,.06,.16];
 const candidates=labels.map((id,i)=>({id,p:probabilities[i],u:uncertainty[i],y:executeToyPatch(id).pass,result:executeToyPatch(id).result,score:probabilities[i]-p.lambda*uncertainty[i]}));
 const ranked=[...candidates].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
 const chosen=ranked[0]; const updated=chosen.p+p.eta*(chosen.y-chosen.p);
 const next=candidates.map(c=>({...c,p:c.id===chosen.id?updated:c.p})).map(c=>({...c,score:c.p-p.lambda*c.u}));
 const nextWinner=[...next].sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id))[0];
 return {params:p,candidates,chosen,updated,next,nextWinner,retained:p.pairPass?next:candidates,oldError:(chosen.p-chosen.y)**2,newError:(updated-chosen.y)**2,steps:6};
}
export function reliability({error=.35,threshold=.2,count=4,minCount=3,coverage=true,adaptCount=4,minAdapt=3,budget=5,cost=3,enabled=true}={}){
 const status=count<minCount||!coverage?'insufficient':error>threshold?'unreliable':'reliable';
 return {status,adapt:enabled&&status==='unreliable'&&adaptCount>=minAdapt&&budget>=cost};
}
export function retain({policyAttempt=true,policyPass=true,modelAttempt=true,modelPass=true,pairPass=true}={}){
 const proposedPolicy=policyAttempt&&policyPass?'θ₁':'θ₀';
 const proposedModel=modelAttempt&&modelPass?'φ₁':'φ₀';
 const changed=proposedPolicy!=='θ₀'||proposedModel!=='φ₀';
 return {proposedPolicy,proposedModel,changed,pairChecked:changed,accepted:!changed||pairPass,policy:changed&&!pairPass?'θ₀':proposedPolicy,model:changed&&!pairPass?'φ₀':proposedModel};
}
