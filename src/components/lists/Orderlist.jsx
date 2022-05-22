import React, { useEffect, useState } from "react";
import { useDB } from "../../hooks/useDB";
import OrderListComponent from "../OrderListComponent";

function Orderlist() {
  const { getOrders, data } = useDB();
  // the value of the search field
  const [name, setName] = useState("");

  // the search result
  const [filteredUsers, setFilteredUsers] = useState([]);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = data.filter((item) => {
        return item.data.fname.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFilteredUsers(results);
    } else {
      setFilteredUsers(data);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <input
        type="search"
        value={name}
        onChange={filter}
        className=" w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Filter"
      />

      {filteredUsers && filteredUsers.length > 0
        ? filteredUsers.map((item) => (
            <OrderListComponent
              fname={item.data.fname}
              lname={item.data.lname}
              passport={item.data.passport}
              cid={item.data.cid}
              orderid={item.id}
              key={item.id}
            />
          ))
        : data.map((item) => (
            <OrderListComponent
              fname={item.data.fname}
              lname={item.data.lname}
              passport={item.data.passport}
              cid={item.data.cid}
              orderid={item.id}
              key={item.id}
            />
          ))}
    </>
  );
}

export default Orderlist;
