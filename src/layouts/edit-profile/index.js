import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link, useParams, useNavigate } from "react-router-dom";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import SelectBox from "devextreme-react/select-box";

import "../modal.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import SoftAvatar from "components/SoftAvatar";
import { storage } from "../authentication/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import user1 from "assets/images/curved-images/user.png";
import Card from "@mui/material/Card";
import ValidationGroup from "devextreme-react/validation-group";
import TextBox from "devextreme-react/text-box";
import notify from "devextreme/ui/notify";
import "devextreme-react/text-area";
import "devextreme/dist/css/dx.light.css";
import {
  Form,
  SimpleItem,
  Label,
  GroupItem,
  ColCountByScreen,
  EmptyItem,
} from "devextreme-react/form";
import Validator, {
  RequiredRule,
  NumericRule,
  EmailRule,
  StringLengthRule,
  PatternRule,
  RangeRule,
} from "devextreme-react/validator";
import Box, { Item } from "devextreme-react/box";
import { auth, db } from "../authentication/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import {
  query,
  collection,
  getDocs,
  where,
  updateDoc,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

// const initialState = {
//   name: "",
//   email: "",
//   phone: "",
//   code: "",
// };

function EditProfile() {
  // const [state, setState] = useState(initialState);
  // const [name, setName] = useState("");
  // const [date, setDate] = useState({});
  // const { name, email, phone, code } = state;
  const navigate = useNavigate();

  const namePattern = /^[^0-9]+$/;
  const phonePattern = /^[02-9]\d{9}$/;
  const phoneRules = {
    X: /[02-9]/,
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!name || !email || !phone || !code) {
  //     toast.error("please provide value in each input field");
  //   } else {
  //     fireDb.child("users").push(state, (err) => {
  //       if (err) {
  //         toast.error(err);
  //       } else {
  //         toast.success("Profile Updated Successfully");
  //       }
  //     });
  //     setTimeout(() => navigate("/"), 500);
  //   }
  // };

  // my codes:
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userEmployeeCode, setUserEmployeeCode] = useState();
  const [userPhone, setUserPhone] = useState();
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedEmployeeCode, setUpdatedEmployeeCode] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");

  const fetchUserName = async (id) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", id));
      const doc = await getDocs(q);
      const userDoc = await doc.docs[0].data();
      console.log(userDoc);
      setUser(userDoc);
      setUpdateFlag(false);
      setUserName(userDoc.name);
      setUserEmail(userDoc.email);
      setUserEmployeeCode(userDoc.empcode);
      setUserPhone(userDoc.phone);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setUpdateFlag(true);
    setUpdatedName(user.name);
    setUpdatedPhone(user.phone);
    setUpdatedEmployeeCode(user.empcode);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: updatedName,
        phone: updatedPhone,
        empcode: updatedEmployeeCode,
      };
      const docId = user.docId;
      const userDoc = doc(db, "users", docId);
      await updateDoc(userDoc, data);
      notify(
        {
          message: "Profile updated Successfully....",
          width: 330,
          shading: true,
          position: "center",
          direction: "up-stack",
        },
        "success",
        1000
      );
    } catch (error) {
      notify(
        {
          message: error,
          width: 500,
          shading: true,
          position: "center",
          direction: "up-stack",
        },
        "error",
        2000
      );
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      if (currentuser.uid.length > 0) {
        console.log(currentuser);
        setUser(currentuser);
        await fetchUserName(currentuser.uid);
      } else {
        console.log("no such user");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return updateFlag === false ? (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3} mb={15}>
        <SoftBox mb={4}>
          <SoftTypography
            textAlign="center"
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "20px",
            }}
          >
            Edit Your Profile
          </SoftTypography>
        </SoftBox>

        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftBox textAlign="center" mt={4} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  // onContentReady={validateForm}
                  //label="Select the"
                >
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <TextBox
                      label="Full Name"
                      labelMode="floating"
                      value={userName}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                        <PatternRule
                          message="Do not use Numbers in the Name"
                          pattern={namePattern}
                        />
                        <StringLengthRule
                          message="Name must have atleast 2 symbols"
                          min={2}
                        />
                      </Validator>
                    </TextBox>
                    <br />
                    <TextBox
                      label="Email Address"
                      labelMode="floating"
                      value={userEmail}
                      readOnly={true}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    >
                      <Validator>
                        <RequiredRule message="Email is required" />
                        <EmailRule message="Email Format is invalid" />
                      </Validator>
                    </TextBox>

                    <br />
                  </GroupItem>
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <TextBox
                      label="Employee Code"
                      labelMode="floating"
                      value={userEmployeeCode}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    ></TextBox>
                    <br />
                    <TextBox
                      label="Phone Number"
                      labelMode="floating"
                      value={userPhone}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
        </SoftBox>

        <SoftBox mt={6}>
          <SoftTypography textAlign="center">
            <SoftButton
              variant="contained"
              color="info"
              onClick={handleEdit}
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
            >
              Update Profile
            </SoftButton>
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15}>
        <SoftBox mb={4}>
          <SoftTypography
            textAlign="center"
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "20px",
            }}
          >
            Edit Your Profile
          </SoftTypography>
        </SoftBox>

        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftBox textAlign="center" mt={4} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  // onContentReady={validateForm}
                  //label="Select the"
                >
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <TextBox
                      label="Full Name"
                      labelMode="floating"
                      value={updatedName}
                      //  defaultValue={docNum}
                      onValueChanged={(e) => {
                        setUpdatedName(e.value);
                        console.log(e.value);
                      }}
                      height={40}
                    >
                      <Validator>
                        <RequiredRule message="Name is required" />
                        <PatternRule
                          message="Do not use Numbers in the Name"
                          pattern={namePattern}
                        />
                        <StringLengthRule
                          message="Name must have atleast 2 symbols"
                          min={2}
                        />
                      </Validator>
                    </TextBox>
                    <br />
                    <TextBox
                      label="Email Address"
                      labelMode="floating"
                      readOnly={true}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      value={userEmail}
                      // //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setUpdatedEmail(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    >
                      <Validator>
                        <RequiredRule message="Email is required" />
                        <EmailRule message="Email Format is invalid" />
                      </Validator>
                    </TextBox>

                    <br />
                  </GroupItem>
                  <GroupItem
                    caption=""
                    //style={{ padding: "20px", backgroundColor: "black" }}
                  >
                    <TextBox
                      label="Employee Code"
                      labelMode="floating"
                      value={updatedEmployeeCode}
                      //  defaultValue={docNum}
                      onValueChanged={(e) => {
                        setUpdatedEmployeeCode(e.value);
                        console.log(e.value);
                      }}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    ></TextBox>
                    <br />
                    <TextBox
                      label="Phone Number"
                      labelMode="floating"
                      value={updatedPhone}
                      //  defaultValue={docNum}
                      onValueChanged={(e) => {
                        setUpdatedPhone(e.value);
                        console.log(e.value);
                      }}
                      //  defaultValue={docNum}
                      // onValueChanged={(e) => {
                      //   setDocNum(e.value);
                      //   console.log(e.value);
                      // }}
                      height={40}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
        </SoftBox>

        <SoftBox mt={6}>
          <SoftTypography textAlign="center">
            <SoftButton
              variant="contained"
              color="info"
              onClick={handleUpdate}
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
            >
              Update Profile
            </SoftButton>
          </SoftTypography>
        </SoftBox>
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default EditProfile;
