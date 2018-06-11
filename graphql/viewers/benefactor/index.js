const { BenefactorTC, ViewerBenefactorTC } = require('../../composers');

module.exports = () => {
  ViewerBenefactorTC.addResolver({
  	kind: 'query',
    name: 'benefactorAccess',
    type: ViewerBenefactorTC,
    resolve: ({ args, context , sourceUser}) => {
  		//console.log('this outlet');
  		sourceUser.id = sourceUser._id;
      return { benefactor: sourceUser }
    },
  })

  const ViewerBenefactorTCFields = {
  	benefactor: BenefactorTC.getType()
  	//add other exclusive to benefactor fields here
  }
  ViewerBenefactorTC.addFields(ViewerBenefactorTCFields);
}
