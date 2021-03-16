import React, { Component } from 'react';
import Checkbox from './checkbox';
import { getCategories, addCategories } from './Redux/action';
import { connect } from 'react-redux';

// Root component -> Manages all app state
class OptionsList extends Component {

  handleCheckboxClicked = (selectedOptionId) => {
    const { selectedOptions, onChange } = this.props;
    if (selectedOptions[selectedOptionId]) {
      delete selectedOptions[selectedOptionId];
    } else {
      selectedOptions[selectedOptionId] = {}
    }
    onChange(selectedOptions)
  }

  handleSubOptionsListChange = (optionId, subSelections) => {
    const { selectedOptions, onChange } = this.props;
    selectedOptions[optionId] = subSelections;
    onChange(selectedOptions);
  }

  render() {
    const { options, selectedOptions, isFirst, toggleModal, deleteCategory } = this.props;
    return (
      <div>
        {options.map((option, index) => (
          <ul className={isFirst && "firstUL"} key={index}>
            <Checkbox
              selected={selectedOptions[option.categoryId]}
              label={option.categoryName}
              option={option}
              toggleModal={(value) => toggleModal(value, option)}
              deleteCategory={() => deleteCategory(option)}
              onChange={() => { this.handleCheckboxClicked(option.categoryId) }}
            />
            {(option.subOptions.length > 0 && selectedOptions[option.categoryId]) &&
              <OptionsList
                options={option.subOptions}
                selectedOptions={selectedOptions[option.categoryId]}
                onChange={(subSelections) => this.handleSubOptionsListChange(option.categoryId, subSelections)}
                toggleModal={(value, option) => toggleModal(value, option)}
                deleteCategory={deleteCategory}
              />
            }
          </ul>
        )
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories, addCategories })(OptionsList);