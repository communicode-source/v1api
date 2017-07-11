import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';

class ProjectNoImageCard extends React.Component {
    constructor({github = null, website = null, description = null, name = null}) {
        super();
        this.description = description;
        this.name = name;
        this.github = github;
        this.website = website;
    }

    build() {
        return (
            <div className={classNames(styles.item, styles.noPic, styles.item1)}>
                <h3>{this.name}</h3>
                <div className={classNames(styles.btns)}>
                    <div className={classNames(styles.button)}>Github</div>
                    <div className={classNames(styles.button)}>Behance</div>
                </div>
                <p>{this.description}</p>
            </div>
        );
    }

    render() {
        return (
            <div className={classNames(styles.projectWrapper, 'row')}>
                <div className={classNames('col-md-2')}>
                    <div className={classNames(styles.projectType)}>
                        <h1>&lt;\&gt;</h1>
                    </div>
                </div>
                <div className={classNames('col-md-10', styles.item)}>
                    {this.build.call(this)}
                </div>
            </div>
        );
    }
}
export default ProjectNoImageCard;
