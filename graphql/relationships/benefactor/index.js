const { BenefactorTC, BenefactorTypeTC } = require('../../composers');

module.exports = () => {
  BenefactorTC.addRelation('experience', {
      resolver: () => BenefactorTypeTC.getResolver('findByIds'),
      prepareArgs: { // resolver `findByIds` has `_ids` arg, let provide value to it
        _ids: (source) => source.type,
      },
      projection: { type: true }, // point fields in source object, which should be fetched from DB
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
