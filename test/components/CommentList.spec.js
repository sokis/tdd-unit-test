import React from 'react';

// Once we set up Karma to run our tests through webpack
// we will no longer need to have these long relative paths
import CommentList from '../../src/components/CommentList';
import { mount } from 'enzyme';

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

});