import moment from 'moment';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SaveControl from '../../../app/components/SaveControl';
import { ONE, ZERO } from '../../../app/constants/Constants';

const id = (x) => x;
const rememberArticleSelector = '#remember-article';
const readArticleSelector = '#read-article';

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
    const wrapper = shallow(
      <SaveControl
        rememberArticle={rememberArticle}
      />,
      { context }
    );

    wrapper.find(rememberArticleSelector).simulate('toggle');

    expect(rememberArticle.called).to.equal(true);
  });

  it('Doesn\'t call remember article on toggle if already saved', () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        defaultState
        rememberArticle={rememberArticle}
      />,
      { context }
    );

    wrapper.find(rememberArticleSelector).simulate('toggle');

    expect(rememberArticle.called).to.equal(false);
  });

  it('Read article checkbox doesn\'t exist if article is not saved', () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        defaultState
        rememberArticle={rememberArticle}
      />,
      { context }
    );

    expect(wrapper.find(rememberArticle)).to.have.length(ZERO);
  });

  it('Read article checkbox exists if article is saved', () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        articleId={42}
        defaultState
        rememberArticle={rememberArticle}
      />,
      { context }
    );

    expect(wrapper.find(readArticleSelector)).to.have.length(ONE);
  });

  it('Call read article on check when article hasn\'t been read', () => {
    const readArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        articleId={ONE}
        defaultState
        readArticle={readArticle}
      />,
      { context }
    );

    wrapper.find(readArticleSelector).simulate('check', null, true);

    expect(readArticle.getCall(ZERO).args[0].articleId).to.equal(ONE);

    const actualTimestamp = moment(readArticle.getCall(ZERO).args[0].timestamp);
    const now = moment();

    expect(moment(actualTimestamp).isSameOrBefore(now)).to.equal(true);
  });

  it('Call read article on check when article has been read', () => {
    const readArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        articleId={ONE}
        defaultState
        readArticle={readArticle}
      />,
      { context }
    );

    wrapper.find(readArticleSelector).simulate('check', null, false);

    expect(readArticle.getCall(ZERO).args).to.deep.equal([{ articleId: ONE, timestamp: null }]);
  });
});
