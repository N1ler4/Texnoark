import { Button } from "antd";
import useAuthStore from "@store";
import "./style.css";
import { getDataFromCookie } from "@token-service";
import { useEffect, useState } from "react";
import { ConfirmModal } from "@components";

export default function Profile() {
  const { getadmin, deleteadmin } = useAuthStore();
  const [data, setData] = useState<any>({});

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmAction = () => {
    deleteadmin(data.id);
    handleCloseModal();
  };


  useEffect(() => {
    const getAdmin = async () => {
      try {
        const adminId = getDataFromCookie("admin-id");
        const res = await getadmin(adminId);
        if (res && res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };

    getAdmin();
  }, []);

  return (
    <div className="profil-body">
      <ConfirmModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        onConfirm={handleConfirmAction}
        message="Are you sure you want to delete account?"
      />
      <div className="absolute top-[80px] right-5">
        {data.is_active == true ? (
          <div className="flex items-center gap-4">
            <p>Online</p>
            <div className="w-[20px] h-[20px] rounded-full bg-green-400"></div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <p>Offline</p>
            <div className="w-[20px] h-[20px] rounded-full bg-red-400"></div>
          </div>
        )}
      </div>
      <div className="container">
        <div className="card cursor-pointer">
          <div className="face face1">
            <div className="content">
              <div className="icon">
                <h1>About</h1>
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="flex flex-col">
              <p className="text-orange-700">
                Name: <span className="text-green-900">{data?.first_name}</span>
              </p>
              <p className="text-orange-700">
                Surname:{" "}
                <span className="text-green-900">{data?.last_name}</span>
              </p>
              <p className="text-orange-700">
                Phone Number:{" "}
                <span className="text-green-900">{data?.phone_number}</span>
              </p>
              <p className="text-orange-700">
                Email: <span className="text-green-900">{data?.email}</span>
              </p>
              <p className="text-orange-700">
                Created at:{" "}
                <span className="text-green-900">
                  {data?.createdAt?.slice(0, 10)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="card cursor-pointer">
          <div className="face face1">
            <div className="content">
              <div className="icon">
                <h1>Action</h1>
              </div>
            </div>
          </div>
          <div className="face face2">
            <div className="flex flex-col gap-3">
              <Button type="primary" onClick={() => alert("Not working")}>
                Edit Profile
              </Button>
              <Button type="primary" onClick={() => handleOpenModal()}>
                Delete Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
