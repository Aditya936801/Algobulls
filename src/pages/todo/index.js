import "antd/dist/antd.css";
import "./index.css";
import AddEditModal from "./subcomponent/modals";
import { ShowMoreModal, deleteModal } from "./subcomponent/modals";
import { tagsView, tagsFilter, statusFilter } from "./subcomponent/filterSort";
import { useState } from "react";
import { Table, Button,Tooltip } from "antd";
import { EditOutlined, DeleteOutlined,PlusOutlined } from "@ant-design/icons";
import moment from "moment";
const Todo = () => {
  const getItemFromLocalStorage = localStorage.getItem("notes");
  const [data, setData] = useState(
    getItemFromLocalStorage ? JSON.parse(getItemFromLocalStorage) : []
  );
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [showMore, setShowMore] = useState(false);
  const [description, setDescription] = useState("");

  const handleEditModal = (record) => {
    const curretObject = {
      key: record?.key,
      status: record?.status,
      title: record?.title,
      description: record?.description,
      tags: record?.tags,
      duedate: moment(record?.duedate, "DD/MM/YYYY"),
    };
    setCurrentRecord(curretObject);
    setEditModal(true);
  };

  const descView = (desc) => {
    return (
      <div>
        {desc?.length > 100 ? (
          <div>
            {desc.slice(0, 101)}
            <Button
              className="showmore-button"
              size="small"
              onClick={() => {
                setShowMore(true);
                setDescription(desc);
              }}
            >
              ShowMore
            </Button>
          </div>
        ) : (
          <div> {desc} </div>
        )}
      </div>
    );
  };

  const columns = [
    {
      title: "Created On",
      dataIndex: "timestamp",
      sorter: (a, b) =>
        moment(a.timestamp, "DD/MM/YYYY").unix() -
        moment(b.timestamp, "DD/MM/YYYY").unix(),
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      render: (desc) => <>{descView(desc)}</>,
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      sorter: (a, b) =>
        moment(a.duedate, "DD/MM/YYYY").unix() -
        moment(b.duedate, "DD/MM/YYYY").unix(),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      filters: tagsFilter,
      onFilter: (value, record) => record?.tags?.includes(value[0]),

      render: (_, { tags }) => <>{tagsView(tags)}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: statusFilter,
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <>
            <EditOutlined
              className="edit-icon"
              onClick={() => {
                handleEditModal(record);
              }}
            />
            <DeleteOutlined
              className="delete-icon"
              onClick={() => {
                deleteModal(data, setData, record);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 8,
        }}
        scroll={{
          
          x: '100vw',
        }}
      />

      <Button
        className="add-button"
        type="primary"
        onClick={() => {
          setAddModal(true);
        }}
      >
        ADD
      </Button>
      <Tooltip title="Add">
        
      <Button
      className="floating-add-button"
        type="primary"
        onClick={() => {
          setAddModal(true);
        }}
        size="large"
        shape="circle"
        icon={<PlusOutlined />}
      />

      </Tooltip>
      <AddEditModal
        addModal={addModal}
        setAddModal={setAddModal}
        data={data}
        setData={setData}
        editModal={editModal}
        setEditModal={setEditModal}
        currentRecord={currentRecord}
      />
      <ShowMoreModal
        showMore={showMore}
        setShowMore={setShowMore}
        desc={description}
      />
    </div>
  );
};

export default Todo;
