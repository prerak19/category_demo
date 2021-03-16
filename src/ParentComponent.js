import React, { Component } from 'react';
import OptionsList from './OptionsList';
import { getCategories, deleteCategories, addCategories, editCategories } from './Redux/action';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

// Root component -> Manages all app state
class ParentComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOptions: {},
      crudData: false,
      form: {
        categoryName: '',
        categoryId: '',
        mainId: '',
        subOptions: [],
      },
      isAdd: false,
    }
  }

  onInputChange(name, value) {
    this.setState({ form: { ...this.state.form, [name]: value } })
  }

  save = (name = 'add') => {
    const { form, isAdd } = this.state;
    if(form.categoryName===''){
      alert('Please Enter Category Name!');
      return;
    }
    let obj = {
      ...form,
      categoryId: form.categoryName,
    }
    if (name === 'edit') {
      this.props.editCategories(obj);
    } else {
      this.props.addCategories(obj, isAdd);
    }
    this.setState({ crudData: false, isAdd: false })
  }

  toggleModal(name = "", option) {
    let form = {};
    if (name === 'add' || name === 'newData') {
      form = {
        categoryName: '',
        categoryId: '',
        mainId: option ? option.mainId : Math.random(),
        subOptions: [],
      }
    } else {
      form = {
        categoryName: option.categoryName,
        categoryId: option.categoryId,
        subOptions: option.subOptions,
        mainId: option.mainId,
      }
    }
    this.setState({ crudData: !this.state.crudData, form, isAdd: name === 'newData' ? true : false })
  }

  deleteCategory = (data) => {
    if (window.confirm('Are You Sure You Want to delete?')) {
      this.props.deleteCategories(data);
    }
  }
  expanData = (arr) => {
    let selectedOptions = { ...this.state.selectedOptions };
    arr.map((x, i) => {
      if (x.categoryId) {
        selectedOptions = { ...selectedOptions, [x.categoryId]: {} }
      }
      if (x.subOptions && x.subOptions.length > 0) {
        this.expanData(x.subOptions);
      }
    });
    return selectedOptions;
  }

  expandAll = () => {
    const { categories } = this.props;
    let selectedOptions = this.expanData(categories);
    this.setState({ selectedOptions });
  }

  render() {
    const { selectedOptions } = this.state;
    const { form, crudData } = this.state;
    return (
      <div className="container">
        <div className="wrapper w-50">
          <h1>Categories</h1>
          <Button className="mb-3" color="success" onClick={() => this.toggleModal('newData')} >Add New Category</Button>
          <Button className="mb-3 ml-2" color="success" onClick={() => this.expandAll()} >Expand All</Button>
          <OptionsList
            options={this.props.categories}
            onChange={(selectedOptions) => {
              this.setState({ selectedOptions })
            }}
            selectedOptions={selectedOptions}
            isFirst={true}
            toggleModal={(value, option) => this.toggleModal(value, option)}
            deleteCategory={this.deleteCategory}
          />
        </div>
        <Modal isOpen={crudData} size="md" key="modalCreate">
          <ModalHeader>{form.categoryId ? 'Edit Category' : 'Add Category'}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="categoryName" className="font-weight-bold">Category Name:</Label>
              <Input name="categoryName" placeholder="Title of Notes"
                value={form.categoryName}
                onChange={(e) => this.onInputChange(e.target.name, e.target.value)} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.save(form.categoryId ? 'edit' : 'add')} >Save</Button>
            <Button onClick={() => this.toggleModal('add')}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  categories: state.categories
});

export default connect(mapStateToProps, { getCategories, deleteCategories, addCategories, editCategories })(ParentComponent); 
