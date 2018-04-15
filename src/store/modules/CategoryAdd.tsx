import { createAction, handleActions } from 'redux-actions';
// 아직은 이뮤터블이 사용 안됨 import { Map, List } from 'immutable';

interface StateType {
  set: Function;
  update: Function;
}

// 카운터 관련 상태 로직
// 액션 타입을 정의해줍니다.
const CHANGE_INPUT = 'categoryAdd/INSERT';

// 액션 생성 함수를 만듭니다.
// 이 함수들은 나중에 다른 파일에서 불러와야 하므로 내보내줍니다.
export const changeInput = createAction(CHANGE_INPUT, (value: string) => value);
// 초기 상태를 정의합니다.
const initialState = {
  value: '',
};

// 내보냄
export default handleActions(
  {
    [CHANGE_INPUT]: (state: StateType, action) =>
      state.set('input', action.payload),
  },
  initialState
);
