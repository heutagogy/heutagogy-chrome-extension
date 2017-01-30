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

describe('Save control tests', () => {
  let sandbox; //eslint-disable-line
  let context; //eslint-disable-line

  beforeEach(() => {
    sandbox = sinon.sandbox.create(); //eslint-disable-line
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Call "Remember article" on toggle', () => {
    const rememberArticle = sandbox.spy();
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });
    wrapper.instance().urlField = { getValue: id }; //eslint-disable-line
    wrapper.instance().titleField = { getValue: id }; //eslint-disable-line

    wrapper.find(rememberArticleSelector).simulate('toggle', null, true);

    expect(rememberArticle.called).to.equal(true);
  });

  it("Don't call 'Remember article' on toggle if already saved", () => {
    const rememberArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub' })}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.find(rememberArticleSelector).simulate('toggle', null, false);

    expect(rememberArticle.called).to.equal(false);
  });

  it("'Read article' checkbox doesn't exist if article is not saved", () => {
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(readArticleSelector)).to.have.length(ZERO);
  });

  it('"Read article" checkbox exists if article is saved', () => {
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub' })}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    expect(wrapper.find(readArticleSelector)).to.have.length(ONE);
  });

  it("Call update article on 'Read article' check when article hasn't been read", () => {
    const updateArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub' })}
        runOnCurrentArticle={id}
        updateArticle={updateArticle}
      />,
      { context }
    );

    wrapper.find(readArticleSelector).simulate('check', null, true);

    expect(updateArticle.getCall(ZERO).args[0]).to.equal(ONE);

    const actualTimestamp = moment(updateArticle.getCall(ZERO).args[1].read);
    const now = moment();

    expect(moment(actualTimestamp).isSameOrBefore(now)).to.equal(true);
  });

  it('Call update article on "Read article" check when article has been read', () => {
    const updateArticle = sandbox.spy();
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'https://github.com/', title: 'GitHub' })}
        runOnCurrentArticle={id}
        updateArticle={updateArticle}
      />,
      { context }
    );

    wrapper.find(readArticleSelector).simulate('check', null, false);

    expect(updateArticle.getCall(ZERO).args).to.deep.equal([ONE, { read: null }]);
  });

  it('Use current title if article is not saved', () => {
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(titleArticleSelector).prop('defaultValue')).equal('GitHub');
  });

  it("Use saved article if it's not empty", () => {
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 2, url: 'http://example.com/', title: 'Example Domain' })}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(titleArticleSelector).prop('defaultValue')).equal('Example Domain');
  });

  it('Editing of title is disabled if article is saved', () => {
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map({ id: 1, url: 'http://example.com/', title: 'Example Domain' })}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    expect(wrapper.find(titleArticleSelector).prop('disabled')).to.equal(ONE);
  });

  it("Editing of title is enabled if article isn't saved", () => {
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });

    expect(wrapper.find(titleArticleSelector).prop('disabled')).to.equal(false);
  });

  it('Edit title before save', () => {
    const rememberArticle = sandbox.spy();
    const currentArticle = new Immutable.Map({ url: 'https://github.com/', title: 'GitHub' });
    const wrapper = shallow(
      <SaveControl
        article={new Immutable.Map()}
        rememberArticle={rememberArticle}
        runOnCurrentArticle={id}
      />,
      { context }
    );

    wrapper.setState({ currentArticle });
    wrapper.instance().urlField = { getValue: () => 'https://github.com/' }; //eslint-disable-line
    wrapper.instance().titleField = { getValue: () => 'New GitHub'}; //eslint-disable-line

    wrapper.find(rememberArticleSelector).simulate('toggle', null, true);

    const args = rememberArticle.getCall(ZERO).args[0];

    expect(args.article.get('title')).to.equal('New GitHub');
    expect(args.article.get('url')).to.equal('https://github.com/');
  });
});
