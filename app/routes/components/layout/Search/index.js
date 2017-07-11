import React, { Component } from 'react';
import SearchBar from '../../../containers/SearchbarContainer';
import SearchList from '../../../containers/SearchResultContainer';
import styles from '../../../assets/css/pages/search.scss';
import classNames from 'classnames';

export default class Search extends Component {
    render() {
        return (
            <div className={classNames('container', 'panel panel-default', styles.panel1)}>
                <div className="container">
                    <div className="col-md-4 col-md-offset-4">
                        <SearchBar/>
                    </div>
                </div>
                <div className={classNames('container', 'col-md-6', 'col-md-offset-2', 'panel panel-default', styles.panel2)}>
                    <div className="container">
                        <div className="col-md-1" >
                            <SearchList type="Nonprofit" accType={false} />
                        </div>
                    </div>
                </div>
            </div>
	);
    }
}
