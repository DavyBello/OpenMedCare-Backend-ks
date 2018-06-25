module.exports = ({ TC, refPath, managedModelType }) => {
	return TC.getResolver('updateById').addArgs({
		managedrefPathValue: 'String!'
	}).wrapResolve(next => async (rp) => {
		//get sourceUser from resolveParams (rp)
		const { sourceUser, sourceUserType, args: { managedrefPathValue } } = rp;

		try {
			const Model = keystone.list(managedModelType).model;
			const exist = await Model.findOne({ refPath: managedrefPathValue})
			if (exist) {
				if (TC.hasField(refPath)){
					rp.beforeRecordMutate = async function(doc, rp) {
						if (doc[refPath] != managedrefPathValue) {
							throw new Error('this user cannot update this document');
						}
					  doc.lastEditedAt = new Date();
						doc.lastEditedBy = sourceUser._id;
					  return doc;
					}
					//run updateById resolver
					return next(rp);
				}
				return Promise.reject(`invalid refPath`)
			}
			throw new Error(`Cannot find "${managedModelType}" with specified _id`);
		} catch (e) {
			// console.log(e);
			if (e.message === `Unknown keystone list "${managedModelType}"`)
				throw new Error(`Unknown model type "${managedModelType}"`);

			if (e.message === `Cast to ObjectId failed for value "${managedrefPathValue}" at path "_id" for model "${managedModelType}"`)
				throw new Error(`Invalid Id supplied for model type "${managedModelType}"`);
		}
	});
}
