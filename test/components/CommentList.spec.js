import React from 'react';

// Once we set up Karma to run our tests through webpack
// we will no longer need to have these long relative paths
import CommentList from '../../src/components/CommentList';
import { mount, shallow } from 'enzyme';

describe('(Component) CommentList', () => {

    it('calls componentDidMount', () => {
        const props = {
            onMount: () => { },
            isActive: false
        };

        sinon.spy(CommentList.prototype, 'componentDidMount');

        // using destructuring to pass props down
        // easily and then mounting the component
        const wrapper = mount(<CommentList {...props} />);

        // CommentList's componentDidMount should have been
        // called once.  spyLifecyle attaches sinon spys so we can
        // make this assertion
        expect(
            CommentList.prototype.componentDidMount.calledOnce
        ).to.be.true;

        CommentList.prototype.componentDidMount.restore();
    });

    it('call onMount prop once it mounts', () => {

        // create a spy for the onMount function
        const props = {
            onMount: sinon.spy()
        };

        // mount our component
        mount(<CommentList {...props} />);

        // expect that onMount was called
        expect(props.onMount.calledOnce).to.be.true;
    });

    it('should render as a <ul>', () => {
        const props = { onMount: () => { } };
        const wrapper = shallow(<CommentList  {...props} />);
        expect(wrapper.type()).to.eql('ul');
    });

    describe('when active...', () => {
        const wrapper = shallow(
            // just passing isActive is an alias for true
            <CommentList onMount={() => { }} isActive />
        )

        it('should render with className  active-list', () => {
            expect(wrapper.prop('className')).to.eql('active-list');
        });
    });

    describe('when inactive...', () => {
        const wrapper = shallow(
            <CommentList onMount={() => { } } isActive={false} />
        )
        it('should render with className inactive-list', () => {
            expect(wrapper.prop('className')).to.eql('inactive-list');
        });
    });
});

