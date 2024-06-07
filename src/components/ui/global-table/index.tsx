import DeleteIcon from "@mui/icons-material/Delete";
import { saveDataToCookie } from "@token-service";
import { BrandEdit, CategoryEdit, UpdateSub , UpdateBrandCategory} from "@components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Index({ tbody, theader, deletIdData }: any) {
  const navigate = useNavigate();

  const handleDelete = (id: any) => {
    console.log("Deleting item with id:", id);
    deletIdData(id);
  };

  return (
    <>
      <table className="max-w-[100%] w-full  mx-auto">
        <thead>
          <tr className="bg-[#F9F9F9] ">
            {theader.map((item: any, index: number) => (
              <th key={index} className="border py-3 text-[18px] font-bold">
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tbody?.map((item: any, index: number) => (
            <tr key={index}>
              {theader?.map((item2: any, index2: number) => (
                <td
                  key={index2}
                  className={
                    index % 2 ? "border bg-[#F9F9F9] py-2" : "border py-2"
                  }
                >
                  {item2?.name === "action" ? (
                    <div className="w-full flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                          saveDataToCookie("categoryId", item.id);
                        }}
                        className="py-1 px-3 rounded-md bg-red-500 hover:bg-red-700 active:bg-red-500 duration-300  flex items-center gap-2"
                      >
                        <DeleteIcon />
                      </button>
                      <div onClick={() => saveDataToCookie("catId", item.id)}>
                        <CategoryEdit />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => (
                          navigate(`/main/category/${item.id}`),
                          saveDataToCookie("Id", item.id)
                        )}
                      >
                        <PlusCircleOutlined className="text-[24px]" />
                      </div>
                    </div>
                  ) : item2.name === "brand action" ? (
                    <div className="w-full flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                          saveDataToCookie("BrandId", item.id);
                        }}
                        className="py-1 px-3 rounded-md bg-red-500 hover:bg-red-700 active:bg-red-500 duration-300  flex items-center gap-2"
                      >
                        <DeleteIcon />
                      </button>
                      <div onClick={() => saveDataToCookie("Id", item.id)}>
                        <BrandEdit />
                      </div>
                      <div
                        className="cursor-pointer"
                        onClick={() => (
                          navigate(`/main/brands/${item.id}`),
                          saveDataToCookie("BrandId", item.id)
                        )}
                      >
                        <PlusCircleOutlined className="text-[24px]" />
                      </div>
                    </div>
                  ) : item2.name === "sub action" ? (
                    <div className="w-full flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="py-1 px-3 rounded-md bg-red-500 hover:bg-red-700 active:bg-red-500 duration-300  flex items-center gap-2"
                      >
                        <DeleteIcon />
                      </button>
                      <div onClick={() => saveDataToCookie("subId", item.id)}>
                        <UpdateSub />
                      </div>
                    </div>
                  ) : item2.name === "brandcategory action" ? (
                    <div className="w-full flex items-center justify-center gap-1">
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                        className="py-1 px-3 rounded-md bg-red-500 hover:bg-red-700 active:bg-red-500 duration-300  flex items-center gap-2"
                      >
                        <DeleteIcon />
                      </button>
                      <div onClick={() => saveDataToCookie("brandCategoryId", item.id)}>
                        <UpdateBrandCategory />
                      </div>
                    </div>
                  ) : item2.name === "id" ? (
                    <div className="w-full flex items-center justify-center">
                      <input type="checkbox" className=" w-4 h-4" />
                    </div>
                  ) : (
                    <p className=" text-center">{item[item2.name]}</p>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Index;
