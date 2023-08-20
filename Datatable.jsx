import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entrySnapshot = collection(db, "Entry");
        const medsSnapshot = collection(db, "Meds");

        // Fetch data from both collections simultaneously using Promise.all
        const [entryData, medsData] = await Promise.all([
          getDocs(entrySnapshot),
          getDocs(medsSnapshot),
        ]);

        const combinedData = entryData.docs.map((doc) => {
          const entryItem = { id: doc.id, ...doc.data(), Description: "" };

          // Find matching data from Meds collection based on medid and ID
          const matchingMeds = medsData.docs.find(
            (medDoc) => medDoc.data().ID === entryItem.medid
          );

          // If matching data is found, add description to the Entry item
          if (matchingMeds) {
            entryItem.Description = matchingMeds.data().Description;
          }

          return entryItem;
        });

        setData(combinedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const unsubscribeEntry = onSnapshot(collection(db, "Entry"), () => {
      fetchData();
    });

    const unsubscribeMeds = onSnapshot(collection(db, "Meds"), () => {
      fetchData();
    });

    return () => {
      unsubscribeEntry();
      unsubscribeMeds();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Entry", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add 
        <Link to="/users/new" className="link">
          Entry
        </Link>
        <Link to="/users/newmed" className="link">
          Meds
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
