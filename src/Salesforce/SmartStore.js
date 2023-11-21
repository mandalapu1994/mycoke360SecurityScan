import { smartstore, mobilesync, forceUtil } from 'react-native-force';
import { TapGestureHandler } from 'react-native-gesture-handler';
import EventEmitter from './events';


const syncDown = forceUtil.promiserNoRejection(mobilesync.syncDown);

const eventEmitter = new EventEmitter();
const SMARTSTORE_CHANGED = "smartstoreChanged";


function emitSmartStoreChanged() {
    eventEmitter.emit(SMARTSTORE_CHANGED, {});
}


const saveData = (contact, callback) => {
    console.log("saveData-contact", contact)
    smartstore.upsertSoupEntries(true, 'contacts', [contact],
        () => {
            callback();
            emitSmartStoreChanged();
        });
}

const getAllStores = (callback = () => { }) => {
    const data = smartstore.getAllStores(
        () => {
            callback(data);
            emitSmartStoreChanged();
        }
    )
}

const registerNewSoupe = (contactData) => {
    // {path:"Id", type:"string"},
    console.log("registerNewSoupe")
    smartstore.registerSoup(false,
        "contacts",
        [{ path: "Id", type: "string" },
        { path: "firstName", type: "full_text" },
        { path: "lastName", type: "full_text" },
        { path: "email", type: "full_text" },
        { path: "phone", type: "full_text" },
        { path: "__local__", type: "string" }],
        (resp) => { console.log("registerNewSoupe-resp", resp) },
        (error) => {
            console.error('registerNewSoupe-error', error);
        }
    );

    smartstore.registerSoup(false,
        "customers",
        [{ path: "Id", type: "string" },
        { path: "Name", type: "full_text" },
        { path: "__local__", type: "string" }],
        (resp) => { console.log("registerNewSoupe-resp", resp) },
        (error) => {
            console.error('registerNewSoupe-error', error);
        }
    );

}

const querySoup = (soupName, successCallback, errorCallback, queryName) => {
    console.log("SOUPNAME UERYSOUP", soupName)
    // let soupNames=["Name","Name"]

    // soupNames.map((ele,i)=>{
    //     const querySpec = smartstore.buildAllQuerySpec(queryName, "ascending", 100);
    //     smartstore.querySoup(false, soupName, querySpec, (success) => successCallback(success),
    //         (error) => errorCallback(error))
    // })

    const querySpec = smartstore.buildAllQuerySpec(queryName, "ascending", 2000);
    smartstore.querySoup(false, soupName, querySpec, (success) => successCallback(success),
        (error) => errorCallback(error))
}




const deleteContact = (contact, successCallback, errorCallback) => {
    smartstore.removeFromSoup(false, "contacts", [contact._soupEntryId],
        successCallback,
        errorCallback);
}

const addContact = (updatedDetails, successCallback, errorCallback) => {
    // Id: `local_${(new Date()).getTime()}`,

    const id = updatedDetails.Id
    console.log("addContact=-=updatedDetails=========", id)
    // const contact = {Id: '0035i0000112jDGAAY',
    //                firstName: "a", lastName: "a", email: "a@edgees.com", phone: '(512) 757-9346', attributes: {type: "Contact"},
    //                __locally_created__: true,
    //                __locally_updated__: true,
    //                __locally_deleted__: false,
    //                __local__: true
    //               };
    console.log("addContact=-=contact", updatedDetails)
    smartstore.upsertSoupEntries(false, "contacts", [updatedDetails],
        (contacts) => successCallback(contacts[0]),
        errorCallback);

    // smartstore.upsertSoupEntriesWithExternalId(false, "contacts", [ updatedDetails ],id,
    //                              (contacts) => successCallback(contacts[0]),
    //                              errorCallback);
}

const createUpdateSoup = (updatedDetails, soupName, successCallback, errorCallback) => {
    console.log("updateContact=-=contact", updatedDetails)


    smartstore.upsertSoupEntries(false, soupName, [updatedDetails],
        (contacts) => successCallback(contacts[0]),
        errorCallback); 
    }


const saveDataLocally = (data, successCallback, errorCallback) => {
    smartstore.upsertSoupEntries(false, "accounts", [data],
        (contacts) => successCallback(contacts[0]),
        errorCallback);
}

const clearSoup = (successCallback, errorCallback) => {
    smartstore.clearSoup(false, "AssortmentProduct",
        (success) => successCallback(success),
        (error) => errorCallback(error)
    );
}

const clearCartSoup = (successCallback, errorCallback, soupName) => {
    smartstore.clearSoup(false, soupName,
        (success) => successCallback(success),
        (error) => errorCallback(error)
    );
}

const clearSoups = (soupsName, successCallback2 ) => {
    console.log(soupsName, 'SOUPS NAME TO CLEAR----------')
    soupsName && soupsName.map((ele, index) => {
        let callback = smartstore.clearSoup(false, ele,
            (success) => console.log(success,'success- while clearing soup'),
            (error) => console.log(error,'err- while clearing soup')
        );
        if(index === soupsName.length -1 ){
            successCallback2(callback, index)
        }
    })
    
}


export {
    saveData, getAllStores, registerNewSoupe,
    deleteContact, addContact, querySoup,
    saveDataLocally, clearSoup, createUpdateSoup,clearCartSoup, clearSoups
};