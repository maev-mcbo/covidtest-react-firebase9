import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs } from "firebase/firestore/lite"
import { auth, db } from "../firebase"

export const useDB = () => {

    const [dataBranches, setDataBranches] = useState([]);
    const [error, setError] = useState();
    const [loading, setLoading] = useState();



    const getBranch = async () => {
        try {
            setLoading(true);
            console.log("Estado cambiado a :" + loading);
            const getBranches = await getDocs(collection(db, "branches"));
            const dataDB = getBranches.docs.map((doc) => (doc.data()));
            setDataBranches(dataDB)
        } catch (error) {
            console.log(error);
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const addBranch = async (branchData) => {
        try {
            setLoading(true);
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
            setLoading(false);

        }
    }

    return {
        dataBranches, error, loading, getBranch, addBranch
    }
}