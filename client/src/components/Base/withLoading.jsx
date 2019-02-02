import React from 'react';

const withLoading = (importComponent) => {
    return class extends React.Component {
        state = {
            component: null
        }

        componentDidMount() {
            console.log("componentdidmount",importComponent);
            importComponent
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props}/> : <p>...Loading</p>;
        }
    }
};

export default withLoading;