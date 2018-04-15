// 모든 모듈들을 불러와서 합치는 작업이 이뤄짐
import { combineReducers } from 'redux';
import CategoryAdd from './CategoryAdd';
// require context webpack
// 루트 리듀서 생성
export default combineReducers({ CategoryAdd });
