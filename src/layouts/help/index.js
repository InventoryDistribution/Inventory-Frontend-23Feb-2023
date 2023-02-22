import Grid from "@mui/material/Grid";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Help() {
  const p = {
    display: "block",
    fontSize: "16px",
    color: "grey",
    //fontFamily: "Arial",
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15}>
        <Grid container style={{ paddingLeft: "50px", paddingRight: "50px" }}>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                fontFamily: "Arial",
              }}
            >
              <strong>Introduction</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Inventory Distribution System is an online software application
              which fulfills the requirement of a typical stock analysis in
              various warehouses. <br></br> – Its main purpose is to define &
              track all the activities & operations in the system, & provide an
              efficient interface to user & admin for managing inventory.{" "}
              <br></br> – The aim of this application is to reduce the manual
              effort needed to manage transactions & historical data used in
              various warehouses.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>Main Menu Components</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              After Logged In, User has to select the functionality as per his
              requirement. <br></br>
              <br></br>1, Production Order List <br></br>– It defines which
              material is processed, at which location, at what time & how much
              quantity is required. <br></br>
              <br></br>2, Goods Receipt Note
              <br></br> – Is a document that acknowledges the delivery of goods
              to a customer by a supplier. <br></br> <br></br>
              3, Inventory Transfer Request
              <br></br> – It is an internal request amongst your company to send
              items from one warehouse to another.<br></br> It updates ordered &
              available quantity in the target warehouse.
              <br></br>
              <br></br> 4, Inventory Transfer Request List <br></br> – It Shows
              all the requested lists of Inventory Transfer.<br></br> <br></br>
              5, Inventory Transfer Approval List<br></br> – It Shows all the
              approved lists of Inventory Transfer. <br></br>
              <br></br>6, Reports
              <br></br>– Description SAP Report is an executable program that
              reads the information in the database & produces output based on
              the filter criteria chosen from end user.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>1. Production Order List</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              It defines which material is processed, at which location, at what
              time & how much quantity is required. <br></br>
              <br></br>User should enter all the required input fields <br></br>
              From Order Date – User should enter from Order Date <br></br>To
              Order Date – User should enter to Order Date <br></br>Order Status
              – User should select Planned or Released <br></br>Document Order
              Number – User should enter Document Order Number <br></br>
              Warehouse – User should enter Warehouse <br></br>Series – User
              should enter Series of academic year <br></br>Filter – Redirected
              to different page & can search all the fields
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>2. Goods Receipt Note</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              Is a document that acknowledges the delivery of goods to a
              customer by a supplier.<br></br>
              <br></br>User should enter all the required input fields <br></br>
              a, From Order Date – User should enter from Order Date. b, To
              Order Date – User should enter to Order Date. c, Order Status –
              User should select Planned or Released. d, Document Order Number –
              User should enter Document Order Number. e, Warehouse – User
              should enter Warehouse. f, Series – User should enter Series of
              academic year. g, Filter – Redirected to different page & can
              search all the fields.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>3. Inventory Transfer Request</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              It is an internal request amongst your company to send items from
              one warehouse to another. <br></br>It updates ordered & available
              quantity in the target warehouse. <br></br>
              <br></br>User should enter all the required input fields <br></br>
              From Order Date – User should enter from Order Date <br></br>To
              Order Date – User should enter to Order Date <br></br>Order Status
              – User should select Planned or Released <br></br>Document Order
              Number – User should enter Document Order Number <br></br>
              Warehouse – User should enter Warehouse <br></br>Series – User
              should enter Series of academic year <br></br>Filter – Redirected
              to different page & can search all the fields
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>4. Inventory Transfer Request List</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              It Shows all the requested lists of Inventory Transfer.<br></br>
              <br></br>User should enter all the required input fields <br></br>
              a, From Order Date – User should enter from Order Date. b, To
              Order Date – User should enter to Order Date. c, Order Status –
              User should select Planned or Released. d, Document Order Number –
              User should enter Document Order Number. e, Warehouse – User
              should enter Warehouse. f, Series – User should enter Series of
              academic year. g, Filter – Redirected to different page & can
              search all the fields.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>5. Inventory Transfer Approval List</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              It Shows all the approved lists of Inventory Transfer. <br></br>
              <br></br>User should enter all the required input fields <br></br>
              a, From Order Date – User should enter from Order Date. b, To
              Order Date – User should enter to Order Date. c, Order Status –
              User should select Planned or Released. d, Document Order Number –
              User should enter Document Order Number. e, Warehouse – User
              should enter Warehouse. f, Series – User should enter Series of
              academic year. g, Filter – Redirected to different page & can
              search all the fields.
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={3}>
            <SoftTypography
              style={{
                fontSize: "24px",
                color: "#0B2F8A",
                letterSpacing: 1,
                letterSpacing: 0.5,
                fontFamily: "Arial",
              }}
            >
              <strong>6. Reports</strong>
            </SoftTypography>
            <SoftTypography style={p} mt={2}>
              SAP Reports are executable program that reads the information in
              the database & produces output based on the filter criteria chosen
              from end user.
              <br></br>
              Crystal Reports are not directly created in web, we should use an
              API that converts reports to binary format.
              <br></br>
              <br></br>
              User should select from 4 options kind of report he want to
              generate <br></br>a, Inventory Transfer Request Print Layout.{" "}
              <br></br> b, Delivery Challan. <br></br>c, Inventory Transfer
              Layout. <br></br>d, Inventory Transfer Request Print Layout with
              Barcode. <br></br>
              <br></br>By selecting one option out of four options, the below
              fields will display <br></br>a, Enter Document Number. <br></br>b,
              Enter Document Series. <br></br>
              <br></br>Display in PDF or Excel Format. <br></br>
              a, By entering correct Document Number & Series Next option is to
              select in which format report has to be generated. <br></br>b,
              User has to select one option out of two, PDF or Excel Format.{" "}
              <br></br>
              <br></br>After Selecting PDF or Excel Format. <br></br>a, Selected
              Report displayed in PDF or Excel Format.
            </SoftTypography>
          </SoftBox>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Help;
