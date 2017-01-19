import Immutable from 'immutable';
import moment from 'moment';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SaveControl from '../../../app/components/SaveControl';
import { ONE, ZERO } from '../../../app/constants/Constants';

const id = (x) => x;

const rememberArticleSelector = '#remember-article';
const readArticleSelector = '#read-article';
const urlArticleSelector = '#article-url';
const titleArticleSelector = '#article-title';

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
        article={new Immutable.Map({ id: 1, url: 'https://github.com/' })}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
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
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', state: true })}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
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
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', state: true })}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    expect(wrapper.find(rememberArticle)).to.have.length(ZERO);
  });

  it('Read article checkbox exists if article is saved', () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', state: true })}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    expect(wrapper.find(readArticleSelector)).to.have.length(ONE);
  });

  it('Call read article on check when article hasn\'t been read', () => {
    const readArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', state: true })}
        readArticle={readArticle}
        runOnCurrentArticle={id}
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
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', state: true })}
        readArticle={readArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.find(readArticleSelector).simulate('check', null, false);

    expect(readArticle.getCall(ZERO).args).to.deep.equal([{ articleId: ONE, timestamp: null }]);
  });

  it('Use current article if article is not saved', () => {
    const currentArticle = new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub', state: true });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(urlArticleSelector).prop('defaultValue')).equal('https://github.com/');
    expect(wrapper.find(titleArticleSelector).prop('defaultValue')).equal('GitHub');
  });

  it('Use saved article if it\'s not empty', () => {
    const currentArticle = new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub', state: true });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 2, url: 'http://example.com/', title: 'Example Domain', state: true })}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(urlArticleSelector).prop('defaultValue')).equal('http://example.com/');
    expect(wrapper.find(titleArticleSelector).prop('defaultValue')).equal('Example Domain');
  });
});
