import React, { Component } from 'react';
import { Table, Input, Button, Space, Checkbox, message } from 'antd';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import FormButton from '../components/Button';
import { getPosition } from '../util/helpers';
import '../scss/projects.scss'




class Projects extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    position: '',
    loading: true
  };

  componentDidMount(props) {
    const position = getPosition();
    if(!position) {
     props.history.push('/login')
    }
    this.setState({ position })
    this.getProjects();
  }

  getProjects = async () => {
    await axios.get(`https://taskmanagement1.herokuapp.com/api/v1/project`)
      .then(res => {
        if (res) {
          this.setState({ data: res.data.data, loading: false })
        }
      });
  };



  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
          text
        ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  trash = async (id) => {
    this.setState({loading: true});
    await axios.delete(`https://taskmanagement1.herokuapp.com/api/v1/project/${id}`)
      .then(res => {
        if (res.data.success) {
          message.success("Project deleted successfully")
          this.getProjects();
        }
      });
  }

  edit = (id) => {
    this.props.history.push({ pathname: '/createproject', search: `?id=${id}` })
  }

  onClickEvent = () => {
    const { history } = this.props
    history.push('/createproject')
  }

  onChange = async (e, id) => {
    this.setState({ loading: true });
    await axios.put(`https://taskmanagement1.herokuapp.com/api/v1/project/${id}`, { projectCompleted: e.target.checked })
      .then(res => {
        this.getProjects()
      });
  }

  render() {
    const { position } = this.state;
    const columns = [
      {
        title: 'ProjectName',
        dataIndex: 'projectName',
        key: 'projectname',
        width: '30%',
        ...this.getColumnSearchProps('projectName'),
      },
      {
        title: 'Technology',
        dataIndex: 'technology',
        key: 'technology',
        width: '20%',
        ...this.getColumnSearchProps('technology'),
      },
      {
        title: 'StartDate',
        dataIndex: 'startDate',
        key: 'startdate',
        width: '20%',
        ...this.getColumnSearchProps('startDate'),
      }, {
        title: 'EndDate',
        dataIndex: 'endDate',
        key: 'enddate',
        width: '20%',
        ...this.getColumnSearchProps('endDate'),
      },
      {
        title: position === 'Admin' ? 'Action' : 'ProjectCompleted ',
        key: position === 'Admin' ? 'edit' : 'projectCompleted',
        dataIndex: position === 'Admin' ? 'edit' : 'projectCompleted',
        width: '20%',
        render: (record, recordIndex) => {
          return (
            <>
              {position === 'Admin' ?
                <div className="row">
                  <div className="edit">
                    <FormOutlined onClick={() => this.edit(recordIndex._id)} />
                  </div>
                  <div className="trash">
                    <DeleteOutlined onClick={() => this.trash(recordIndex._id)} />
                  </div>
                </div> : <div><Checkbox checked={recordIndex.projectCompleted} onChange={(e) => this.onChange(e, recordIndex._id)}></Checkbox></div>
              }
            </>
          );
        }
      }
    ];
    return (
      <>
        {position === 'Admin' &&
            <FormButton classes="project-btn" onClickEvent={this.onClickEvent}>Create Project</FormButton>
        }
        <Table
          loading={this.state.loading}
          columns={columns}
          dataSource={this.state.data} />
      </>
    )
  }
}

export default Projects;