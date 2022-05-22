import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore/lite"
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
            const getOrders = await getDocs(collection(db, "orders"));
            const dataDB = getOrders.docs.map((doc) => (Object.assign({ id: doc.id }, { data: doc.data() })));
            Object.fromEntries(dataDB)
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
                cid: orderData.cid,
                fname: orderData.fname,
                lname: orderData.lname,
                gender: orderData.gender,
                email: orderData.email,
                dob: orderData.dob,
                address: orderData.address,
                country: orderData.country,
                arrivaldate: orderData.arrivaldate,
                departureDate: orderData.departureDate,
                dest: orderData.dest,
                lines: orderData.lines,
                origin: orderData.origin,
                passport: orderData.passport,
                suc: orderData.suc,
                testtype: orderData.testtype,
                createdBy: auth.currentUser.uid,
                paymentCurrency: 'null',
                paymentStatus: 'null',

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
            setLoading((prev) => ({ ...prev, [id]: false }));
        }
    }


    const getSingleOrder = async (id) => {
        try {
            console.log("el ID a buscar es:" + id );
            setLoading((prev) => ({ ...prev, getSingleOrderLoading: true }));
            console.log("Estado cambiado a :" + loading);
            const dataDB = (await getDoc(doc(db, 'orders', id))).data()

            setData(dataDB)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, getSingleOrderLoading: false }))
        }
    }

    return {
        data, error, loading, getBranch, addBranch, addOrder, getOrders, deleteData, getSingleOrder
    }
}