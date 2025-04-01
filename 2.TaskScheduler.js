class TaskScheduler {
  constructor(concurrency) {
    this.concurrency = concurrency; // 最大并发任务数
    this.runningCount = 0; // 当前正在运行的任务数
    this.taskQueue = []; // 任务队列
  }

  /**
   * 添加一个异步任务到调度器
   * @param {Function} taskFn - 返回Promise的函数
   * @returns {Promise} - 任务执行的结果
   */
  addTask(taskFn) {
    return new Promise((resolve, reject) => {
      // 将任务及其resolve和reject回调封装到队列中
      const task = {
        taskFn,
        resolve,
        reject
      };
      
      this.taskQueue.push(task);
      // 尝试运行队列中的任务
      this.runTask();
    });
  }

  /**
   * 尝试从队列中运行任务
   */
  runTask() {
    // 如果没有任务或正在运行的任务已达到最大并发数，则返回
    if (this.taskQueue.length === 0 || this.runningCount >= this.concurrency) {
      return;
    }

    // 增加运行计数
    this.runningCount++;
    
    // 取出队列中的第一个任务
    const { taskFn, resolve, reject } = this.taskQueue.shift();
    
    // 执行任务
    Promise.resolve()
      .then(() => taskFn())
      .then(result => {
        // 任务成功完成
        resolve(result);
        this.completeTask();
      })
      .catch(error => {
        // 任务执行出错
        reject(error);
        this.completeTask();
      });
  }

  /**
   * 完成一个任务的处理
   */
  completeTask() {
    // 减少运行计数
    this.runningCount--;
    
    // 尝试运行下一个任务
    this.runTask();
  }
}

const scheduler = new TaskScheduler(2);

const task1 = () => new Promise(resolve => setTimeout(() => resolve('Task 1'), 1000));
const task2 = () => new Promise(resolve => setTimeout(() => resolve('Task 2'), 500));
const task3 = () => new Promise(resolve => setTimeout(() => resolve('Task 3'), 300));
const task4 = () => new Promise(resolve => setTimeout(() => resolve('Task 4'), 200));

scheduler.addTask(task1).then(result => console.log(result));
scheduler.addTask(task2).then(result => console.log(result));
scheduler.addTask(task3).then(result => console.log(result));
scheduler.addTask(task4).then(result => console.log(result));

// Task 2
// Task 3
// Task 1
// Task 4
