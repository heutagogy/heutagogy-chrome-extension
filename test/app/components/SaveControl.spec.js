import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SaveControl from '../../../app/components/SaveControl';

const id = (x) => x;
const rememberArticleSelector = '#remember-article';

describe('Export page tests', () => {
  let sandbox; //eslint-disable-line
  let context; //eslint-disable-line

  beforeEach(() => {
    sandbox = sinon.sandbox.create(); //eslint-disable-line

    context = { //eslint-disable-line
      i18n: {
        l: id,
      },
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Call remember article on toggle', () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(<SaveControl rememberArticle={rememberArticle} />, { context });

    wrapper.find(rememberArticleSelector).simulate('toggle');

    expect(rememberArticle.called).to.equal(true);
  });
});
