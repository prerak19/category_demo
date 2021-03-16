import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { getCategories, addCategories } from './Redux/action';
import { connect } from 'react-redux';

// Root component -> Manages all app state
class Checkbox extends Component {
	render() {
		const { selected, label, option, onChange, toggleModal, deleteCategory } = this.props;
		return (
			<div>
				<div className="iconClass float-right" onClick={() => option.subOptions.length > 0 ? onChange(!selected) : toggleModal('add')}>
					<i className={`fa fa-lg ${selected ? 'fa-minus' : 'fa-plus'}`}></i>
				</div>
				<div  style={{ width: 'fit-content' }}>
					<ContextMenuTrigger id={option.categoryId}>
						<div className="d-inline">{label}</div>
					</ContextMenuTrigger>
				</div>
				<ContextMenu id={option.categoryId}>
					<MenuItem
						data={{ action: 'add' }}
						onClick={() => toggleModal('add')}
					>
						Add New Category
      </MenuItem>
					<MenuItem
						data={{ action: 'edit' }}
						onClick={() => toggleModal()}
					>
						Edit Category
      </MenuItem>
					<MenuItem
						data={{ action: 'delete' }}
						onClick={() => deleteCategory()}
					>
						Delete Category
      </MenuItem>
				</ContextMenu>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	categories: state.categories
});

export default connect(mapStateToProps, { getCategories, addCategories })(Checkbox); 