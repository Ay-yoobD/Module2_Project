    <template>
        <div class="MainPayRoll">
            <header class="PayRollHead">
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
                                            <dl v-if="selectedUserInfo && selectedSalaryInfo" class="EmployeeInfo">
                                                <dt>Employee ID :</dt>
                                                <dd>{{ selectedUserInfo.EmployeeID }}</dd>

                                                <dt>Hours employee worked:</dt>
                                                <dd>{{ selectedSalaryInfo.HoursWorked }}</dd>

                                                <dt>Hourly Rate:</dt>
                                                <dd>R {{ ratePHR ? ratePHR.toFixed(2) : 'N/A' }} / hr</dd>

                                                <dt>Amount of deductions:</dt>
                                                <dd>{{ selectedSalaryInfo.LeaveDeductions }}</dd>

                                                <dt>Gross Salary Amount:</dt>
                                                <dd>{{ selectedSalaryInfo.FinalSalary }}</dd>
                                            </dl>

                                        </div>

                                    </div>

                                </div>

                                <div class="col-lg-5 text-center  ">
                                    <select v-model="selectedEmployeeId" name="EmployeeSelect" id="cmbEmployeeSelect">
                                        <option selected disabled hidden value="">Choose Employee</option>
                                        <option v-for="EmpID in UsersInfo" :key="EmpID.EmployeeID"
                                            :value="EmpID.EmployeeID">
                                            ID:{{ EmpID.EmployeeID }} {{ EmpID.Name }}


                                        </option>
                                    </select>

                                    <button class="MainPayBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        Show all deduction full details
                                    </button>

                                    <button class="MainPayBtn" @click="showPayslipDetails">
                                        Calculate and Display full payslip details
                                    </button>

                                    <a style="text-decoration: none; color: black;"
                                        :href="selectedEmployeeId && payslipVisible ? `/PDFs/Payslip_${selectedEmployeeId}.pdf` : '#'"
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

                            <div v-if="selectedEmployeeId || deduction" class="modal-body">
                                <p> Number of deductions: {{ selectedSalaryInfo.LeaveDeductions }}</p>
                                <p>Deductions in Rands: R {{ deduction }}</p>
                                <p><strong>Other Deductions</strong></p>
                                <p>PAYE - 36 %</p>
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
                            MordernTech Employee ID: {{ selectedUserInfo.EmployeeID }}
                            <br>
                            Employee Name: {{ selectedUserInfo.Name }}
                            <br>
                            Company Position: {{ selectedUserInfo.Position }}
                            <br>

                            <br>


                        </div>

                        <div class="col-6 col-md-4 themed-grid-col text-start">
                            Employee Department: {{ selectedUserInfo.Department }}
                            <br>
                            Hourly Rate:R {{ ratePHR ? ratePHR.toFixed(2) : 'N/A' }}
                            <br>
                            Hours Worked: {{ selectedSalaryInfo.HoursWorked }}


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
                            R{{ selectedUserInfo.Salary }}
                            <br>
                            {{ selectedSalaryInfo.LeaveDeductions }}
                            <br>
                            R {{ deduction }}
                            <br>
                            R {{ selectedSalaryInfo.FinalSalary }}

                            <br>
                            <br>
                            <br>
                            36%
                            <br>
                            R {{ PAYE.toFixed(2).toLocaleString() }}
                            <br>
                            2%
                            <br>
                            R {{ UIF.toFixed(2).toLocaleString() }}
                            <br>
                            5%
                            <br>
                            R {{ HealthInsure.toFixed(2).toLocaleString() }}
                            <br>
                            <br>
                            <br>
                            R {{ TakeHome.toFixed(2).toLocaleString() }}

                        </div>

                    </div>

                </div>

            </main>

        </div>

    </template>

<script>


export default {
    data() {
        return {
            //Creating objects to hold the Vuex/Store data and selected id from <select> element above

            selectedEmployeeId: '',                                  //Will be filled with ID from select elemnt above
            payslipVisible: false,
            UsersInfo: [],                                           //Used to locally store Vuex data
            SalaryInfo: [],                                          //Used to locally store Vuex data

        }

    },

    mounted() {
        // this.$store.dispatch('getUsers');
        this.$store.dispatch('getUsers').then(() => {
            this.UsersInfo = this.$store.state.users;
        });
        this.$store.dispatch('getSalaries').then(() => {
            this.SalaryInfo = this.$store.state.salaries;
        });


    },

 
    methods: {

        showPayslipDetails() {
            if (this.selectedEmployeeId) {
                this.payslipVisible = true
            }
        }
    },


    //Selecting the related information using the v-model/selected id from dropdown
    //Find is used to search through the array to find matching Employee ID
    computed: {
        selectedSalaryInfo() {
            return this.SalaryInfo.find(
                EmployeePay => EmployeePay.EmployeeID === Number(this.selectedEmployeeId)
            );
        },

        selectedUserInfo() {
            return this.UsersInfo.find(
                EmployeeData => EmployeeData.EmployeeID === Number(this.selectedEmployeeId)
            );

        },



        UsersUpd() {
            return this.$store.state.users;

        },

        SalariesUpd() {
            return this.$store.state.salaries;
        },

        //---------------------------------Backend Calculations:--------------------------------------------------
        deduction() {
            console.log('Deduction from store:', this.$store.getters.getDeduction);
            return this.$store.getters.getDeduction;
        },

        ratePHR() {
            console.log('Rate from store:', this.$store.getters.getRateHr);
            return this.$store.getters.getRateHr;
        },

        PAYE() {
            console.log('PAYE from store:', this.$store.getters.getPAYE);
            return this.$store.getters.getPAYE;
        },

        UIF() {
            console.log('UIF from store:', this.$store.getters.getUIF);
            return this.$store.getters.getUIF;
        },

        HealthInsure() {
            console.log('HealthInsure from store:', this.$store.getters.getHealthInsure);
            return this.$store.getters.getHealthInsure;
        },

        TakeHome() {
            console.log('TakeHome from store:', this.$store.getters.getTakeHome);
            return this.$store.getters.getTakeHome;
        },




    },
    watch: {
        selectedEmployeeId(id) {
            this.$store.dispatch('fetchDeduction', id);
            this.$store.dispatch('fetchRateHr', id);
            this.$store.dispatch('fetchPAYE', id);
            this.$store.dispatch('fetchUIF', id);
            this.$store.dispatch('fetchHealthInsure', id);
            this.$store.dispatch('fetchTakeHome', id);


        },
        //This will check if Users in vuex/store will change, used in case user table in MySQL changes
        UsersUpd(newUsers) {
            this.UsersInfo = newUsers;
        },
        SalariesUpd(newSalaries) {
            this.SalaryInfo = newSalaries;
        },
    },


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

.MainPayBtn a {
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