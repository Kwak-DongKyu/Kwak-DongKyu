export default class Component {
    constructor(props = {}) {
        this.props = props;
        this.element = null;
    }

    render() {
        throw new Error('Component must implement render method');
    }

    mount(parent) {
        this.element = this.render();
        if (parent) {
            parent.appendChild(this.element);
        }
        this.onMount();
        return this.element;
    }

    onMount() {
        // Lifecycle hook
    }
}
