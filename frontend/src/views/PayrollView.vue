<template>
    <div class="MainPayRoll">
        <header class="PayRollHead" >
            <h2 class=" p-3 fw-bold">Payroll & Payslip management:</h2>
        </header>

        <main class="PayrollBody">
            <div class="container-xl ImageContain">
                <figure class="figure PayImage">
                    <img src="../assets/Meter.png" class="figure-img img-fluid rounded" alt="...">
                    <figcaption class="figure-caption">Total Number of Deductions severity</figcaption>
                </figure>

                <figure class="figure PayImage">
                    <img src="../assets/SalariesPie.png" class="figure-img img-fluid rounded" alt="...">
                    <figcaption class="figure-caption">Total Paid Takeaway Salaries vs Not Paid</figcaption>
                </figure>

                <figure class="figure PayImage">
                    <img src="../assets/EmployeeGraph.jpg" class="figure-img img-fluid rounded" alt="...">
                    <figcaption class="figure-caption">Increasing number of ModernTech employees</figcaption>
                </figure>


            </div>

            <div class="container-xl">
                <hr style=" color: #2d5652; ">

                <div class="Title display-4 fw-bold">
                    <p>Payslip audit:</p>

                </div>
                <hr style=" color: #2d5652;">

                <section id="intro">

                    <div class="container-lg">

                        <div class="row justify-content-center align-items-center">

                            <div class="col-md-5 text-center text-md-start testbox">

                                <div class="PayManageBody">

                                    <div class="info-card">
                                        <h3 class="fw-bolder">Employee Salary & Payroll overview:</h3>
                                        <dl class="EmployeeInfo">
                                            <dt>Employee ID :</dt>
                                            <dd>{{ selectedEmployee?.employeeId }}</dd>

                                            <dt>Hours employee worked:</dt>
                                            <dd>{{ selectedEmployee?.hoursWorked }}</dd>

                                            <dt>Hourly Rate:</dt>
                                            <dd>R {{ employeeratephr ? employeeratephr.toFixed(2) : 'N/A' }} / hr</dd>

                                            <dt>Amount of deductions:</dt>
                                            <dd>{{ selectedEmployee?.leaveDeductions }}</dd>

                                            <dt>Gross Salary Amount:</dt>
                                            <dd>{{ selectedEmployee?.finalSalary }}</dd>

                                        </dl>

                                    </div>

                                </div>

                            </div>

                            <div class="col-lg-5 text-center  ">
                                <select v-model="selectedEmployeeId" name="EmployeeSelect" id="cmbEmployeeSelect">
                                    <option selected disabled hidden value="">Choose Employee</option>
                                    <option v-for="EmployeeData in EmployeeInfo" :key="EmployeeData.employeeId"
                                        :value="EmployeeData.employeeId">
                                        ID:{{ EmployeeData.employeeId }} {{ EmployeeData.name }}
                                    </option>
                                </select>

                                <button class="MainPayBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Show all deduction full details
                                </button>

                                <button class="MainPayBtn" @click="showPayslipDetails">
                                    Calculate and Display full payslip details
                                </button>

                                <a style="text-decoration: none; color: black;" :href="selectedEmployeeId && payslipVisible ? `/PDFs/Payslip_${selectedEmployeeId}.pdf` : '#'" 
                                    :download="selectedEmployeeId && payslipVisible ? `Payslip_${selectedEmployeeId}.pdf` : null"
                                    :class="['MainPayBtn', { disabled: !selectedEmployeeId || !payslipVisible }]">

                                    Create Digital Payslip (PDF)

                                </a>

                            </div>

                        </div>
                    </div>
                    <hr>
                </section>

            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">

                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Detailed Deduction List</h1>


                        </div>

                        <div v-if="selectedEmployeeId" class="modal-body ">
                            <p> Number of deductions: {{ selectedEmployee.leaveDeductions }}</p>
                            <p>Deductions in Rands: R {{ deductionInRands.toLocaleString() }}</p>
                            <p><strong>Other Deductions</strong></p>
                            <p>PAYE - 34%</p>
                            <p>UIF - 2%</p>
                            <p>Health Insurance - 5%</p>

                        </div>
                        <div v-else class="modal-body">
                            Please select an employee
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>

            </div>

            <div class="container-xl PaySlipRow">

                <h3 class="fw-bold display-5 py-2  text-center">ModernTech Employee Payslip:</h3>

                <hr>

                <div v-if="selectedEmployeeId && payslipVisible" class="row mb-3 ">

                    <div class="col-md-8 themed-grid-col text-start">
                        MordernTech Employee ID: {{ selectedEmployee?.employeeId }}
                        <br>
                        Employee Name: {{ selectedEmployeeDetails?.name }}
                        <br>
                        Company Position: {{ selectedEmployeeDetails?.position }}
                        <br>

                        <br>


                    </div>

                    <div class="col-6 col-md-4 themed-grid-col text-start">
                        Employee Department: {{ selectedEmployeeDetails?.department }}
                        <br>
                        Hourly Rate:R {{ employeeratephr ? employeeratephr.toFixed(2) : 'N/A' }}
                        <br>
                        Hours Worked: {{ selectedEmployee?.hoursWorked }}


                    </div>
                    <hr>
                    <div class="col-md-8 themed-grid-col text-start">
                        Initial Employee Salary:
                        <br>
                        Deductions from salary:
                        <br>
                        Deductions in Rands:
                        <br>
                        Taxable Salary:
                        <br>
                        <br>
                        <h6><strong>Other Deductions:</strong></h6>
                        PAYE Percentage:
                        <br>
                        PAYE Amount:
                        <br>
                        UIF Percantage:
                        <br>
                        UIF Amount:
                        <br>
                        Health Insurance Percantage:
                        <br>
                        Health Insurance Amount:
                        <br>
                        <br>
                        <h5><strong>Take Home Pay:</strong></h5>
                        <br>


                    </div>

                    <div class="col-6 col-md-4 themed-grid-col text-end">
                        R{{ selectedEmployeeDetails?.salary }}
                        <br>
                        {{ selectedEmployee?.leaveDeductions }}
                        <br>
                        R {{ deductionInRands.toLocaleString() }}
                        <br>
                        R {{ selectedEmployee?.finalSalary }}

                        <br>
                        <br>
                        <br>
                        34%
                        <br>
                        R {{ calculatePAYE.toFixed(2).toLocaleString() }}
                        <br>
                        2%
                        <br>
                        R {{ calculateUIF.toFixed(2).toLocaleString() }}
                        <br>
                        5%
                        <br>
                        R {{ calculateHealthInsure.toFixed(2).toLocaleString() }}
                        <br>
                        <br>
                        <br>
                        R {{ calculateTakeHome.toFixed(2).toLocaleString() }}

                    </div>

                </div>

            </div>

        </main>

    </div>

</template>

<script>
//Importing locally stored json files
import PayrollData from '@/assets/Resources/payroll_data.json'
import EmployeeData from '@/assets/Resources/employee_info.json'

export default {
    data() {
        return {
            //Creating objects to hold the json data and selected id from <select> element above
            EmployeeList: PayrollData.payrollData,                  //Holds employee payroll data
            EmployeeInfo: EmployeeData.employeeInformation,         //Holds general employee details
            selectedEmployeeId: '',                                  //Will be filled with ID from select elemnt above
            payslipVisible: false

        }

    },
    //Function made to be called just to test if json came through, wont be used anywhere in 'live' site  
    methods: {
        tester() {
            return console.log(this.EmployeeList);

        },

        showPayslipDetails() {
            if (this.selectedEmployeeId) {
                this.payslipVisible = true
            }
        }
    },


    //Selecting the related information using the v-model/selected id from dropdown
    //Find is used to search through the array to find matching Employee ID
    computed: {
        selectedEmployee() {
            return this.EmployeeList.find(
                EmployeePay => EmployeePay.employeeId === Number(this.selectedEmployeeId)
            );
        },

        selectedEmployeeDetails() {
            return this.EmployeeInfo.find(
                EmployeeData => EmployeeData.employeeId === Number(this.selectedEmployeeId)
            );

        },

        //Simple calcalution to find the deduction in rands
        deductionInRands() {
            if (this.selectedEmployee && this.selectedEmployeeDetails) {
                return this.selectedEmployeeDetails.salary - this.selectedEmployee.finalSalary;
            }
        },

        //Calculation to find the pay rate per hour of an employee
        employeeratephr() {
            if (this.selectedEmployee && this.selectedEmployeeDetails && this.selectedEmployee.hoursWorked > 0) {
                return this.selectedEmployeeDetails.salary / this.selectedEmployee.hoursWorked
            }
            return 0;


        },

        calculatePAYE() {
            if (this.selectedEmployee && this.selectedEmployeeDetails) {
                let iPercent = 36;
                return this.selectedEmployee.finalSalary * (iPercent / 100)

            }

        },

        calculateUIF() {
            if (this.selectedEmployee && this.selectedEmployeeDetails) {
                let iPercent = 2;
                return this.selectedEmployee.finalSalary * (iPercent / 100)

            }

        },

        calculateHealthInsure() {
            if (this.selectedEmployee && this.selectedEmployeeDetails) {
                let iPercent = 5;
                return this.selectedEmployee.finalSalary * (iPercent / 100)

            }

        },

        calculateTakeHome() {
            if (this.selectedEmployee && this.selectedEmployeeDetails) {
                return (
                    this.selectedEmployee.finalSalary -
                    this.calculatePAYE -
                    this.calculateUIF -
                    this.calculateHealthInsure
                );
            }
            return 0;

        }

    }
}

</script>

<style>
.MainPayRoll {
    overflow-x: visible;
    font-family: Baskerville;
    background: rgb(255, 255, 255);
    min-height: 100vh;
}

.PayRollHead {
    background-color: #93d1cb;
    padding: 1rem 1px 12px 70px;
    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
    box-shadow: 0 4px 4px rgba(147, 209, 203, 0.447);
    min-height: 70px;
    display: flex;
    align-items: center;
    font-family: OreganFont;

}

.PayRollHead h2 {
    margin: 0;
    font-size: 2.75rem;
    color: #2c3e50;
}

/* Ensures page content doesn't overlap */
.PayrollBody {
    padding-top: 1rem;
}


.PayImage {
    width: 350px;
    margin: 0px 30px;


}

.ImageContain {
    margin-top: 50px;
    margin-bottom: 50px;
}

.PayImage figcaption {
    color: #2c3e50;
    font-size: 18px;

}

.Title {
    margin: 15px;
    padding: 5px;
}

.MainPayBtn {
    margin: 40px;
    margin-bottom: 30px;
    width: 500px;
    text-align: center;
    border-radius: 5px;
    border: #0c2c47 solid 3px;
    box-shadow: #B497BD 3px 3px 2px;
    background: #93d1cb;
    padding: 7px 5px;
    transition: background 0.3s ease;
    transition: box-shadow 0.2s ease;
    transition: transform 0.3s ease;
    font-size: 18px;
    display: block;

}

.MainPayBtn a{
    text-decoration: none;
}



.MainPayBtn:hover {
    background: #B497BD;
    box-shadow: none;
    transform: scale(1.026);
}

#cmbEmployeeSelect {
    width: 250px;
    margin: 10px;
    margin-left: 15%;
    height: 40px;
    text-align: center;
    padding: 5px 5px;
    border: 2px solid #0c2c47;
    border-radius: 5px;
    box-shadow: #B497BD 3px 3px 2px;
    transition: background 0.3s ease;


}

#cmbEmployeeSelect:hover {
    border: solid #c3e4d1;
}

.testbox {
    /* box-shadow: #B497BD 4px 4px 3px; */
    border: #0c2c47 solid 3px;
    padding: 35px;
    border-radius: 5px;
}

.testbox h3 {
    text-decoration: underline;
}

.modal-body {
    font-size: 18px;

}

.PaySlipRow {
    border: #0c2c47 solid 2.5px;
    border-radius: 5px;
    padding: 30px;
}
</style>