const initialData = {
	list : [],
	avatar: "",
	loading: "hide"
}
const todoReducers = (state = initialData, action) =>{
	switch(action.type){
		case "ADD_TODO" : 
		const {id, data} = action.payload;
		return{
			...state,
			list: [
				...state.list,
				{
					id: id,
					data: data,
				}
			]
		}
		case "DELETE_TODO" : 
		const newList = state.list.filter((elem) => elem.id !== action.id)
		
		return{
			...state,
			list: newList 
		}
		
		case "REMOVE_TODO" : return{
			...state,
			list: []
		}
		case "GET_AVATAR": {
			return {
				...state,
				avatar: action.payload
			}
		}
		case "SHOW_LOADING": {
			return {
				...state,
				loading: "open"
			}
		}
		case "HIDE_LOADING": {
			return {
				...state,
				loading: "hide"
			}
		}
		default: return state;
	}
}
export default todoReducers;