import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';
import ProjectCard from './ProjectCard';
import ProjectNoImageCard from './ProjectNoImageCard';
import PortfolioCreationModal from './../../../containers/PortfolioCreationModalContainer';

class Projects extends React.Component {
    constructor({started, completed, repos, projects, overlayPortfolioCreateModal}) {
        super();
        this.started = started;
        this.completed = completed;
        this.repos = repos;
        this.projects = projects;
        this.overlayPortfolioCreateModal = overlayPortfolioCreateModal;
    }

    render() {
        return (
            <div id={classNames(styles.portfolio)}>
                <div id={classNames(styles.numProj)}>
                    <div className={classNames(styles.left)}>
                        <h2>{this.started}</h2>
                        <hr />
                        <h5>Projects Started</h5>
                    </div>
                    <div className={classNames(styles.right)}>
                        <h2>{this.completed}</h2>
                        <hr />
                        <h5>Projects Completed</h5>
                    </div>
                </div>
                <div id={classNames(styles.createPortfolio)}>
                    <button onClick={ () => { this.overlayPortfolioCreateModal(); } } className={classNames('btn', 'btn-primary')}>
                        Add a New Project <i className={classNames('fa', 'fa-plus')} aria-hidden="true"></i>
                    </button>
                </div>
                <div className={classNames(styles.projectContainer)}>
                    {this.repos.map((item, index) => <ProjectNoImageCard key={index} github={item.github} website={item.website} description={item.description} name={item.name}/>)}
                </div>
                <div className="row" id={classNames(styles.pFlex)}>
                    {this.projects.map((item, index) => <ProjectCard key={index} image={item.image} github={item.github} website={item.website} description={item.description} name={item.name}/>)}
                </div>

                <PortfolioCreationModal />
            </div>
          );
    }
}

export default Projects;
