module.exports = ({ TC, refPath, managedModelType }) => {
	return TC.get('$createOne').addArgs({
		managedId: 'String!'
	}).wrapResolve(next => async (rp) => {
		//get sourceUser from resolveParams (rp)
		const { sourceUser, sourceUserType, args: { managedId } } = rp;

		try {
			const Model = keystone.list(managedModelType).model;
			const doc = await Model.findOne({ _id: managedId})
			if (doc) {
				if (TC.hasField(refPath)){
					rp.args.record[refPath] = managedId;
					rp.args.record.createdBy = sourceUser._id;
					rp.args.record.createdAt = Date.now();
					//run createOne resolver
					return next(rp);
				}
				return Promise.reject(`invalid refPath`)

			}
			throw new Error(`Cannot find "${managedModelType}" with specified _id`);
		} catch (e) {
			// console.log(e);
			if (e.message === `Unknown keystone list "${managedModelType}"`)
				throw new Error(`Unknown model type "${managedModelType}"`);

			if (e.message === `Cast to ObjectId failed for value "${managedId}" at path "_id" for model "${managedModelType}"`)
				throw new Error(`Invalid Id supplied for model type "${managedModelType}"`);
		}
	});
}
