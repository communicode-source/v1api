import React from 'react';
import classNames from 'classnames';
import styles from './../../../assets/css/pages/profile.scss';

class ProjectCard extends React.Component {
    constructor({image = null, github = null, website = null, description = null, name = null}) {
        super();
        this.image = image;
        this.description = description;
        this.name = name;
        this.github = github;
        this.website = website;
    }

    build() {
        const links = [];
        if(this.github !== null) {
            links.push(<a href={this.github}><i className={classNames('fa', 'fa-github')} aria-hidden="true"></i></a>);
        }
        if(this.website !== null) {
            links.push(<a href={this.website}><i className={classNames('fa', 'fa-globe')} aria-hidden="true"></i></a>);
        }
        return (
            <div>
                <img src={this.image} alt="" />
                <div className={classNames(styles.info)}>
                    {links}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={classNames(styles.item, styles.pic, 'col-md-3', 'col-sm-12')}>
                {this.build.call(this)}
            </div>
        );
    }
}
export default ProjectCard;
