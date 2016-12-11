import { expect } from 'chai';
import { saveOptions, SAVE_OPTIONS } from '../../../app/actions/options';

const id = (x) => (x);

describe('save options action', () => {
  it('', () => {
    const serverAddress = 'http://localhost:5000';
    const username = 'myuser';
    const password = 'mypassword';

    expect(saveOptions({ serverAddress, username, password })(id)).to.eql({
      type: SAVE_OPTIONS,
      serverAddress, username, password,
    });
  });
});
