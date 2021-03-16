const initialstate = {
	categories: [
	]
};

const addData = (cat, data) => {
	if (cat.mainId === data.mainId) {
		let finalData = { ...data, mainId: Math.random() }
		cat.subOptions.push(finalData);
	}
	else {
		if (cat.subOptions && cat.subOptions.length > 0) {
			cat.subOptions.map((x, i) => {
				addData(x, data);
			})
		}
	}
	return cat;
}

const updateData = (cat, data) => {
	if (cat.mainId === data.mainId) {
		cat = { ...data, categoryId: data.categoryId, categoryName: data.categoryName, subOptions: data.subOptions }
	}
	else {
		if (cat.subOptions && cat.subOptions.length > 0) {
			cat.subOptions = cat.subOptions.map((x, i) => updateData(x, data));
		}
	}
	return cat;
}

const deleteData = (tempArr, data) => {
	let delIndex = tempArr.find((x, i) => x.mainId === data.mainId);
	if (delIndex) {
		tempArr = tempArr.filter((x, i) => x.mainId !== data.mainId);
	}
	else {
		tempArr = tempArr.map((cat, i) => {
			if (cat.subOptions && cat.subOptions.length > 0) {
				cat.subOptions = deleteData(cat.subOptions, data);
				return cat;
			}
			return cat;
		})
	}
	return tempArr;
}

const reducer = (state = initialstate, action) => {
	switch (action.type) {
		case 'GET_CATEGORIES':
			return {
				...state
			};
		case 'ADD_CATEGORIES':
			let arr = state.categories;
			if (!action.isNew) {
				arr = arr.map((x, i) => addData(x, action.payload));
			} else {
				arr.push(action.payload);
			}
			return {
				...state,
				categories: arr
			};
		case 'UPDATE_CATEGORIES':
			let temp = state.categories;
			temp = temp.map((x, i) => updateData(x, action.payload));
			return {
				...state,
				categories: temp
			};
		case 'DELETE_CATEGORIES':
			let tempDel = deleteData(state.categories, action.payload);
			return {
				...state,
				categories: tempDel
			};
		default:
			return state;
	}
};

export default reducer;   