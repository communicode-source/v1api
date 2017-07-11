import React, { PropTypes } from 'react';
import Rodal from 'rodal';
import styles from '../../assets/css/modals/portfolioCreateModal.scss';
import * as classes from '../../assets/classes/PortfolioCreationModal';
import * as rules from '../../rules';

// include styles
// import 'rodal/lib/rodal.css';

class PortfolioCreationModal extends React.Component {

    constructor(props) {
        super(props);
        super(props);
        this.props = props;
    }

    hide() {
        this.props.onTogglePortfolioModal(false);
    }

    handleFormSubmit(event) {
        // Prevent normal handling of submit button
        event.preventDefault();
        this.props.onCreateNewPortfolioProject();
    }

    render() {
        const error = this.props.error !== null ? this.props.error : '';
        let projectName;

        if(this.props.overlay.shouldShowPortfolioCreateModal) {
            return (
                <Rodal className={styles.modal} visible={this.props.overlay.shouldShowPortfolioCreateModal} onClose={this.hide.bind(this)}>
                    <div>Add a Project</div>
                    <form onSubmit={(e) => { this.handleFormSubmit(e); }}>
                        <div className={classes.INPUT_FIELD}>
                            <div className={classes.INPUT_LABEL}>
                                <h6 className={classes.INPUT_LABEL_NAME}>Project Name</h6>
                                <h6 className={classes.INPUT_LABEL_ERROR}>{error}</h6>
                            </div>
                            <input type="text" value={this.props.projectName} placeholder="Project Name" required ref={node => {projectName = node;}} onChange={() => this.props.onValidateProjectName(projectName.value) } maxLength={`${rules.MAX_PASSWORD_LENGTH}`} />
                        </div>

                        <div className="login-submit-button">
                            <button type="submit" className={classes.SUBMIT_BUTTON}>Create</button>
                        </div>
                    </form>
                </Rodal>
            );
        }
        return (
            <div></div>
        );
    }
}

PortfolioCreationModal.propTypes = {
    overlay: PropTypes.object,
    projectName: PropTypes.string,
    error: PropTypes.string,
    onPortfolioCreate: PropTypes.func,
    onTogglePortfolioModal: PropTypes.func,
    onValidateProjectName: PropTypes.func,
    onCreateNewPortfolioProject: PropTypes.func
};

export default PortfolioCreationModal;
