// import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
// import { Form } from "react-bootstrap";
import "../modal.css";
import { useState, useEffect } from "react";
// import user1 from "assets/images/curved-images/user.png"
// import { auth } from 'layouts/authentication/firebase';
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
// import { async } from "@firebase/util";
// import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard"
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import ValidationGroup from "devextreme-react/validation-group";
import TextBox from "devextreme-react/text-box";
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
import notify from "devextreme/ui/notify";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const auth = getAuth();
  const namePattern = /^[^0-9]+$/;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      //console.log("Auththfht", currentuser);
      //console.log("Auththfht", currentuser.email);
      setEmail(currentuser.email);
      setUser(currentuser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // console.log("Auththfhtytktkhukhuk", email);

  // const [fromDateOneError, setFromDateOneError] = useState(false);

  // setFromDateOneError(false);

  // if (email === "") {
  //   setFromDateOneError(true);
  // }
  // console.log("Authtyrfty", currentuser);
  const triggerResetEmail = async () => {
    // console.log("Authtyrfty", auth);
    await sendPasswordResetEmail(auth, email);
    notify(
      {
        message: "We have sent Password reset link to your Email!",
        width: 430,
        shading: true,
        position: "center",
      },
      "success",
      1500
    );
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <SoftBox py={3} mb={35}>
        <SoftBox mb={4}>
          <SoftTypography
            textAlign="center"
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "25px",
              lineHeight: "30px",
            }}
          >
            Reset Your Password
          </SoftTypography>
        </SoftBox>

        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftBox textAlign="center" mt={4} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form colCount={1} labelMode="floating" labelLocation="left">
                  <GroupItem>
                    <TextBox
                      label="Email Address"
                      labelMode="floating"
                      value={email}
                      readOnly={true}
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
                  ></GroupItem>
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
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
              onClick={triggerResetEmail}
            >
              Send Password Reset Link
            </SoftButton>
          </SoftTypography>
        </SoftBox>

        <SoftBox
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h4 style={{ color: "#0B2F8A", marginTop: "20px" }}>
                  Please Fill all the Required Fields
                </h4>
                <button
                  className="close-modal"
                  onClick={toggleModal}
                  style={{
                    backgroundColor: "#0B2F8A",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "50px",
                    marginBottom: "20px",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ResetPassword;
