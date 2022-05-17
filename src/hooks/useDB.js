import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore/lite"
import { auth, db } from "../firebase"

export const useDB = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});



    const getBranch = async () => {
        try {
            setLoading((prev) => ({ ...prev, getBranchLoading: true }));
            console.log("Estado cambiado a :" + loading);
            const getBranches = await getDocs(collection(db, "branches"));
            const dataDB = getBranches.docs.map((doc) => (doc.data()));
            setData(dataDB)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, getBranchLoading: false }))
        }
    }

    const getOrders = async () => {
        try {
            setLoading((prev) => ({ ...prev, getOrdersLoading: true }));
            console.log("Estado cambiado a :" + loading);
            const getOrders = await getDocs(collection(db, "orders"));
            const dataDB = getOrders.docs.map((doc) => ( Object.assign({id:doc.id },{data: doc.data()})));
            Object.fromEntries(dataDB)
            console.log(dataDB);
            setData(dataDB)

            
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, getOrdersLoading: false }))
        }
    }

    const addBranch = async (branchData) => {
        try {
            setLoading((prev) => ({ ...prev, addBranchLoading: true }));
            const newBranchData = {
                suc: branchData.suc,
                sucAddress: branchData.sucAddress,
                createdBy: auth.currentUser.uid
            }

            const branchToBeAdded = await addDoc(collection(db, "branches"), newBranchData)
            console.log("Se agrego la nueva sucursal" + branchToBeAdded.id)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, addBranchLoading: false }));

        }
    }


    const addOrder = async (orderData) => {
        try {
            setLoading((prev) => ({ ...prev, addOrderLoading: true }));
            const newOrderData = {
                address: orderData.address,
                arrivaldate: orderData.arrivaldate,
                cid: orderData.cid,
                country: orderData.country,
                departureDate: orderData.departureDate,
                dest: orderData.dest,
                dob: orderData.dob,
                email: orderData.email,
                fname: orderData.fname,
                gender: orderData.gender,
                lines: orderData.lines,
                lname: orderData.lname,
                origin: orderData.origin,
                passport: orderData.passport,
                suc: orderData.suc,
                testtype: orderData.testtype,
                createdBy: auth.currentUser.uid
            }

            const orderToBeAdded = await addDoc(collection(db, "orders"), newOrderData)
            console.log("Se agrego la nueva orden" + orderToBeAdded.id)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, addOrderLoading: false }));

        }
    }


    const deleteData = async (id) => {
        try {
            setLoading((prev) => ({ ...prev, [id]: true }));
            const docRef = doc(db, "orders", id);
            await deleteDoc(docRef);
            setData(data.filter((doc) => doc.id !== id));
        } catch (error) {
            console.log(error);
            setError(error.code);
        } finally {
            setLoading((prev) => ({ ...prev, [id]: false  }));
        }
    };

    return {
        data, error, loading, getBranch, addBranch, addOrder, getOrders,deleteData
    }
}