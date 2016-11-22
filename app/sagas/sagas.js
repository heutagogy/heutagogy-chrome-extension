import entity from './entity';

export default function *rootSaga() {
  yield [
    entity(),
  ];
}
