import { expect } from 'chai';
import { saveCurrentUrl, SET_CURRENT_URL } from '../../../app/actions/view';

describe('set current url action', () => {
  it('', () => {
    const currentUrl = 'https://github.com/';

    expect(saveCurrentUrl({ currentUrl })).to.eql({
      type: SET_CURRENT_URL,
      url: currentUrl,
    });
  });
});
