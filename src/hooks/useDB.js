import { useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, setDoc, updateDoc } from "firebase/firestore/lite"
import { auth, db } from "../firebase"

export const useDB = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState({});



/**
 * set the state of loading to true, then I'm try to get the data from the database,
 * then set the state of data to the data I got from the database, finally set
 * the state of loading to false.
 */
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

/**
 * get the data from the database and then set it to the state.
 */
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


/**
 * It adds a new order to the database.
 * @param orderData 
 */
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
                fseat: orderData.fseat,
                testtype: orderData.testtype,
                createdBy: auth.currentUser.uid,
                phone: orderData.phone,
                paymentCurrency: 'null',
                paymentStatus: 'pendiente',
                testResult: 'pendiente',
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


/**
 * It takes an id, sets the loading state to true for that id, gets the document reference, deletes the
 * document, filters the data state to remove the document with the id, and finally sets the loading
 * state to false for that id.
 * @param id - the id of the document to be deleted
 */
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


/**
 * It gets a single order from the database, and if it's successful, it sets the data to the state.
 * @param id - the id of the document to be retrieved
 */
    const getSingleOrder = async (id) => {
        try {
            setLoading((prev) => ({ ...prev, getSingleOrderLoading: true }));
            const dataDB = (await getDoc(doc(db, 'orders', id))).data()
            setData(dataDB)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, getSingleOrderLoading: false }))
        }
    }
/**
 * @param status - "approved or negated"
 * @param currency - "USD"
 * @param id - the id of the order
 */

    const paymenteManager = async (status, currency, ref, amaunt, id) => {
        try {
            setLoading((prev) => ({ ...prev, changingPayment: true }));
            console.log("Cambiando el pago", status, currency, id);
            const docRef = doc(db, "orders", id);
            updateDoc(docRef, {
                paymentCurrency: currency,
                paymentStatus: status,
                ref: ref,
                paymentAmaunt: amaunt
            })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading((prev) => ({ ...prev, changingPayment: false }));
        }
    }

/**
 * It takes a result and an id, then it updates the result in the database, and then it gets the
 * updated order from the database.
 * @param result - the result of the test (positive or negative)
 * @param id - the id of the order
 */
    const resultManager = async (result, id) => {
        try {
            setLoading((prev) => ({ ...prev, changingResult: true }));
            console.log("Cambiando el resultado", result, id);
            const docRef = doc(db, "orders", id);
            updateDoc(docRef, { testResult: result })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading((prev) => ({ ...prev, changingResult: false }));
        }

    }

    return {
        data, 
        error, 
        loading, 
        getBranch, 
        addBranch, 
        addOrder, 
        getOrders, 
        deleteData, 
        getSingleOrder, 
        paymenteManager, 
        resultManager
    }
}