<!-- 
per cridar-lo:
import TaskProgress from './components/TaskProgress.vue';
<TaskProgress task-name="Tarea" total-steps="5" />
 -->

<script>
export default {
    name: 'TaskProgress',
    data() {
        return {
            currentStep: 0,
            updatedSteps: 0,
        }
    },
    props: {
        taskName: String,
        totalSteps: String,
    },
    methods: {
        add() {
            if (this.currentStep < parseInt(this.totalSteps)) {
                this.currentStep++;
                this.updatedSteps++;
            }
        },
        substract() {
            if (this.currentStep > 0) {
                this.currentStep--;
                this.updatedSteps++;
            }
        }
    },
    computed: {
        processPercentage(){
            if(parseInt(this.totalSteps === 0)) return 0;
            return Math.round((this.currentStep / parseInt(this.totalSteps) ) * 100);
        }
    }
}
</script>

<template>
    <h3>{{ taskName }}</h3>
    <p>Step {{ currentStep }} of {{ totalSteps }}</p>
    <button @click="add" :disabled="currentStep >= parseInt(totalSteps)">Next step</button>
    <button @click="substract" :disabled="currentStep <= 0">Previous step</button>
    <small>Updated {{ updatedSteps }} times</small>
    <p v-if="currentStep === 0">Task not started</p>
    <p v-else-if="currentStep >= parseInt(totalSteps)">Task completed</p>
    <p v-else>Task in progress…</p>
    <p>Progress: {{ processPercentage }}%</p>
</template>