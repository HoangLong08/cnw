import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table, Modal } from "antd";
import Header from "../Common/Header/Index.jsx";
import Sidebar from "../Common/SideBar/Index.jsx";
import {
  getUserListAdminAction,
  lockAccountAdminAction,
  unlockAccountAdminAction,
} from "../../../redux/actions";
import "../ManagerUser/style.css";

const columns = [
  { title: "Avatar", dataIndex: "imageUser", key: "imageUser" },
  { title: "Tên khách hàng", dataIndex: "nameUser", key: "nameUser" },
  { title: "Giới tính", dataIndex: "gender", key: "gender" },
  { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Action", dataIndex: "actionUser", key: "actionUser" },
];

function Index({
  userListAdmin,
  lockAccount,
  unlockAccount,
  getUserListAdminTask,
  postLockActionTask,
  postUnlockActionTask,
}) {
  // console.log("userListAdmin: ", userListAdmin);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentInfoModal, setContentInfoModal] = useState({});

  console.log("contentInfoModal: ", contentInfoModal);

  function showModal() {
    setIsModalVisible(true);
  }

  const handleOk = () => {
    if (contentInfoModal.checkLock === 1) {
      postLockActionTask(contentInfoModal);
    } else {
      postUnlockActionTask(contentInfoModal);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!lockAccount.load || !unlockAccount.load) {
      getUserListAdminTask();
    }
  }, [lockAccount, unlockAccount, getUserListAdminTask]);

  function renderListUser() {
    return userListAdmin?.data?.map((item, index) => {
      // console.log("item: ", item);
      return {
        key: index,
        imageUser: (
          <div className="item-avatar-admin">
            <img src={item.image} alt={item.name} />
          </div>
        ),
        nameUser: item.lastName + " " + item.firstName,

        gender: item.gender ? item.gender : "chưa đk",
        phone: item.phone ? item.phone : "chưa đk",
        email: item.email,
        moreInfo: (
          <>
            <p>Ngày sinh: {item.birthDay}</p>
            <p>
              Địa chỉ: {item.address} - {item.street} - {item.distric} -{" "}
              {item.city}
            </p>
          </>
        ),

        actionUser: (
          <div className="action-user-admin">
            <div>
              <button
                onClick={() => {
                  showModal();
                  setContentInfoModal({
                    lastName: item.lastName,
                    firstName: item.firstName,
                    idUser: item.id,
                    checkLock: item.disable,
                  });
                }}
              >
                {item.disable === 1 ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <i className="fas fa-times"></i>
                )}
              </button>
            </div>
            {/* <div>
              <button>
                <i className="fas fa-pen"></i>
              </button>
            </div> */}
          </div>
        ),
      };
    });
  }

  return (
    <div className="wrap-website">
      <Sidebar />
      <Header />
      <div className="content-website">
        <h1>Manager user</h1>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <>{record.moreInfo}</>
              // console.log("record: ", record.moreInfo),
            ),
          }}
          dataSource={renderListUser()}
        />
        <Modal
          title="Thông báo"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            Bạn có {contentInfoModal.checkLock === 1 ? " khóa " : " mở "} tài
            khoản {contentInfoModal.lastName} {contentInfoModal.firstName} này
            không ?{" "}
          </p>
        </Modal>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userListAdmin } = state.userAdminReducer;
  const { lockAccount, unlockAccount } = state.authAdminReducer;
  return {
    userListAdmin: userListAdmin,
    lockAccount: lockAccount,
    unlockAccount: unlockAccount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserListAdminTask: () => dispatch(getUserListAdminAction()),
    postLockActionTask: (params) => dispatch(lockAccountAdminAction(params)),
    postUnlockActionTask: (params) =>
      dispatch(unlockAccountAdminAction(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
