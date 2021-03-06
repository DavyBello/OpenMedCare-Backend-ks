const { BenefactorTC, MalariaRecordTC } = require('../../composers');

module.exports = () => {
  BenefactorTC.addRelation('malariaRecords', {
      resolver: () => MalariaRecordTC.getResolver('findMany'),
      prepareArgs: {
        filter: (source) => ({medCareId: source.medCareId}),
      },
      projection: { medCareId: 1 }, // point fields in source object, which should be fetched from DB
    }
  );
  // BenefactorTC.addRelation('documentsPagination', {
  //     resolver: () => BenefactorDocumentTC.getResolver('pagination'),
  //     prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
  //       filter: (source) => ({ _ids: source.documentsUploaded}),
  //     },
  //     projection: { jobs: true }, // point fields in source object, which should be fetched from DB
  //   }
  // );
}
