<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import api from "@/api/api";

const chartData = ref();
const chartOptions = ref();
const selectedPeriod = ref('សប្ដាហ៍');
const dataUser = ref({
    totalUsers: 0,
    totalNotes: 0,
    totalCompletedNotes: 0,
    totalIncompletedNotes: 0,
});

const updateChartData = async (period) => {
    selectedPeriod.value = period;
    try {
        const response = await api.get(`/admin/summary?period=${period}`,);
        dataUser.value = response.data.data;
        console.log(dataUser.value);
        chartData.value = {
            labels: period === 'សប្ដាហ៍' ? ['ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហ', 'សុក្រ', 'សៅរ៍', 'អាទិត្យ'] :
                period === 'ខែ' ? ['សប្តាហ៍ទី១', 'សប្តាហ៍ទី២', 'សប្តាហ៍ទី៣', 'សប្តាហ៍ទី៤'] : ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា'],
            datasets: [{
                label: `ស្ថិតិកិច្ចការ (${period})`,
                backgroundColor: '#13707F',
                data: dataUser.value.chart_values || [10, 20, 15, 25, 22, 30, 28],
                borderRadius: 6
            }]
        };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
onMounted(() => {
    updateChartData('សប្ដាហ៍');
    chartOptions.value = { maintainAspectRatio: false, aspectRatio: 0.8 };
});
</script>
<template>
    <section id="section-dashboard" class="content-section active">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-800 mb-0" style="font-weight: 800;">ផ្ទាំងព័ត៌មាន</h3>
            <div class="d-flex gap-2">
                <button class="btn btn-light border btn-sm">ផ្ទុកទិន្នន័យឡើងវិញ</button>
                <button class="btn btn-brand btn-sm">បង្កើតរបាយការណ៍ PDF</button>
            </div>
        </div>

        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card stat-card shadow-sm border-0">
                    <h6 class="text-muted small fw-bold mb-2">អ្នកប្រើប្រាស់ប្រព័ន្ធ</h6>
                    <div class="d-flex align-items-end justify-content-between">
                        <h3 class="fw-bold mb-0">{{ dataUser.totalUsers }}</h3>
                        <span class="text-success small fw-bold">+12.4% &uarr;</span>
                    </div>
                    <div class="progress mt-3" style="height: 4px;">
                        <div class="progress-bar"
                            :style="{ width: Math.min((dataUser.totalUsers / 100) * 100, 100) + '%', backgroundColor: '#13707F' }">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card stat-card shadow-sm border-0">
                    <h6 class="text-muted small fw-bold mb-2">ភារកិច្ចកំពុងដំណើរការ</h6>
                    <div class="d-flex align-items-end justify-content-between">
                        <h3 class="fw-bold mb-0">{{ dataUser.totalIncompletedNotes || 0 }}</h3>
                        <span class="text-info small fw-bold">+820 ថ្ងៃនេះ</span>
                    </div>
                    <div class="progress mt-3" style="height: 4px;">
                        <div class="progress-bar bg-info"
                            :style="{ width: dataUser.totalNotes > 0 ? (dataUser.totalIncompletedNotes / dataUser.totalNotes * 100) + '%' : '0%' }">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card stat-card shadow-sm border-0">
                    <h6 class="text-muted small fw-bold mb-2">ភារកិច្ចដែលបានបញ្ចប់</h6>
                    <div class="d-flex align-items-end justify-content-between">
                        <h3 class="fw-bold mb-0">{{ dataUser.totalCompletedNotes || 0 }}</h3>
                        <span class="text-success small fw-bold">ល្អប្រសើរ</span>
                    </div>
                    <div class="progress mt-3" style="height: 4px;">
                        <div class="progress-bar bg-success"
                            :style="{ width: dataUser.totalNotes > 0 ? (dataUser.totalCompletedNotes / dataUser.totalNotes * 100) + '%' : '0%' }">
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="card stat-card shadow-sm border-0" style="cursor: pointer">
                    <h6 class="text-muted small fw-bold mb-2">ភារកិច្ចទាំងអស់</h6>
                    <div class="d-flex align-items-end justify-content-between">
                        <h3 class="fw-bold mb-0 text-danger">{{ dataUser.totalNotes }}</h3>
                        <span class="text-danger small fw-bold">សរុប</span>
                    </div>
                    <div class="progress mt-3" style="height: 4px;">
                        <div class="progress-bar bg-danger" style="width: 100%"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card p-4 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h6 class="fw-bold mb-0">លំហូរនៃសកម្មភាពសរុប</h6>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-light border-none"
                                :class="{ 'active text-white': selectedPeriod === 'សប្ដាហ៍' }"
                                :style="{ 'background-color': selectedPeriod === 'សប្ដាហ៍' ? '#13707F' : '' }"
                                @click="updateChartData('សប្ដាហ៍')">
                                សប្ដាហ៍
                            </button>
                            <button class="btn btn-light border-none"
                                :class="{ 'active text-white': selectedPeriod === 'ខែ' }"
                                :style="{ 'background-color': selectedPeriod === 'ខែ' ? '#13707F' : '' }"
                                @click="updateChartData('ខែ')">
                                ខែ
                            </button>
                            <button class="btn btn-light border-none"
                                :class="{ 'active text-white': selectedPeriod === 'ឆ្នាំ' }"
                                :style="{ 'background-color': selectedPeriod === 'ឆ្នាំ' ? '#13707F' : '' }"
                                @click="updateChartData('ឆ្នាំ')">
                                ឆ្នាំ
                            </button>
                        </div>
                    </div>
                    <Chart type="bar" :data="chartData" :options="chartOptions" class="h-75 mt-3" />
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card p-4 h-100">
                    <h6 class="fw-bold mb-4">សកម្មភាពបច្ចុប្បន្នជាក់ស្តែង</h6>
                    <div class="list-group list-group-flush small" id="activity-feed">
                        <div class="list-group-item px-0 py-3 border-0 border-bottom">
                            <div class="d-flex gap-2">
                                <div class="p-1 bg-primary-subtle rounded text-primary"><i data-lucide="user-plus"
                                        size="14"></i></div>
                                <div>
                                    <p class="mb-0 fw-bold">អ្នកប្រើប្រាស់ថ្មីបានចុះឈ្មោះ</p>
                                    <p class="mb-0 text-muted small">Sarah Jenkins បានចូលរួមក្នុងប្រព័ន្ធ</p>
                                    <small class="text-muted">២ នាទីមុន</small>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item px-0 py-3 border-0 border-bottom">
                            <div class="d-flex gap-2">
                                <div class="p-1 bg-success-subtle rounded text-success"><i data-lucide="check"
                                        size="14"></i></div>
                                <div>
                                    <p class="mb-0 fw-bold">សម្រេចបានសមិទ្ធផល</p>
                                    <p class="mb-0 text-muted small">ភារកិច្ច #4021 បានបញ្ចប់</p>
                                    <small class="text-muted">១២ នាទីមុន</small>
                                </div>
                            </div>
                        </div>
                        <div class="list-group-item px-0 py-3 border-0">
                            <div class="d-flex gap-2">
                                <div class="p-1 bg-danger-subtle rounded text-danger"><i data-lucide="alert-octagon"
                                        size="14"></i></div>
                                <div>
                                    <p class="mb-0 fw-bold">ការបំពានសុវត្ថិភាព</p>
                                    <p class="mb-0 text-muted small">បានបិទ IP ដែលគួរឱ្យសង្ស័យ: 192.168.1.1</p>
                                    <small class="text-muted">១ ម៉ោងមុន</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-light w-100 mt-auto small fw-bold">មើលកំណត់ត្រាសរុប</button>
                </div>
            </div>
        </div>
    </section>

</template>
<style scoped>
/* Modern UI Components */
.card {
    border: 1px solid var(--border-color);
    border-radius: var(--card-radius);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    background: #fff;
    margin-bottom: 1.5rem;
}

.stat-card {
    padding: 1.75rem;
    border: none;
    transition: all 0.2s;
    cursor: pointer;
}

.stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(19, 112, 127, 0.08);
}

.btn-brand {
    background-color: var(--brand-primary);
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 700;
    border: none;
    transition: all 0.2s;
}

.btn-brand:hover {
    background-color: var(--brand-hover);
    color: white;
}

.table thead th {
    background: #F8FAFC;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 800;
    color: #64748B;
    padding: 1.25rem 1rem;
}

.badge-status {
    padding: 0.4em 0.8em;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 0.75rem;
}

/* Section Handling */
.content-section {
    display: none;
    animation: slideUp 0.4s ease-out;
}

.content-section.active {
    display: block;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(15px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 991px) {
    #sidebar {
        transform: translateX(-100%);
    }

    #sidebar.active {
        transform: translateX(0);
    }

    #main-wrapper {
        margin-left: 0 !important;
    }
}
</style>