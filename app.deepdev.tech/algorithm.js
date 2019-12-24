//todo: CNN here: https://towardsdatascience.com/building-a-convolutional-neural-network-cnn-in-keras-329fbbadc5f5
//automatic know if first layer is CNN, if so, then change shape of dataset

var dataset_id = "cifar10";

//Dataset Constants
var NUM_FEATURES = 784;
var NUM_CLASSES = 10;
var NUM_TRAIN_SAMPLES = 60000;
var NUM_TEST_SAMPLES = 10000;

var dataline1 = "from keras.datasets import " + dataset_id;
var dataline2 = "(X_train, y_train), (X_test, y_test) = " + dataset_id + ".load_data()";

switch(dataset_id){
    case "mnist":
        NUM_FEATURES = 28*28;
        NUM_CLASSES = 10;
        NUM_TRAIN_SAMPLES = 60000;
        NUM_TEST_SAMPLES = 10000;
        break;
    case "fashion_mnist":
        NUM_FEATURES = 28*28;
        NUM_CLASSES = 10;
        NUM_TRAIN_SAMPLES = 60000;
        NUM_TEST_SAMPLES = 10000;
        break;
    case "cifar10":
        NUM_FEATURES = 32*32*3;
        NUM_CLASSES = 10;
        NUM_TRAIN_SAMPLES = 50000;
        NUM_TEST_SAMPLES = 10000;
        break;
    case "cifar100":
        NUM_FEATURES = 32*32*3;
        NUM_CLASSES = 100;
        NUM_TRAIN_SAMPLES = 50000;
        NUM_TEST_SAMPLES = 10000;
        break;
    default:
        console.log("Dataset id invalid.");
        break;
}
//parameters
var PARAM_NAME = "Code Generated by DeepDev | " + dataset_id;

var PARAM_EPOCHS = 30;
var PARAM_OPTIMIZER = "'adam'";
var PARAM_OUTPUT_ACTIVATION = "'softmax'";
var PARAM_LOSS = "'categorical_crossentropy'";

var PARAM_BATCH_SIZE = 128;
var PARAM_SHUFFLE = "True";
var PARAM_VALIDATION_SPLIT = 0;

var PARAM_VERBOSE = 2;

function DenseLayer(){
    this.numNodes = 512;
    this.activation = "'relu'";
}

var layers = [new DenseLayer(), new DenseLayer(), new DenseLayer()];

loadJSON(function(response) {
    var file = response;

    //replacing dataset params
    file = file.replaceAll("NUM_FEATURES", NUM_FEATURES);
    file = file.replaceAll("NUM_CLASSES", NUM_CLASSES);
    file = file.replaceAll("NUM_TRAIN_SAMPLES", NUM_TRAIN_SAMPLES);
    file = file.replaceAll("NUM_TEST_SAMPLES", NUM_TEST_SAMPLES);
    
    //replacing basic variables
    file = file.replaceAll("PARAM_NAME", PARAM_NAME);
    
    file = file.replaceAll("PARAM_EPOCHS", PARAM_EPOCHS);
    file = file.replaceAll("PARAM_OPTIMIZER", PARAM_OPTIMIZER);
    file = file.replaceAll("PARAM_OUTPUT_ACTIVATION", PARAM_OUTPUT_ACTIVATION);
    file = file.replaceAll("PARAM_LOSS", PARAM_LOSS);
    
    file = file.replaceAll("PARAM_BATCH_SIZE", PARAM_BATCH_SIZE);
    file = file.replaceAll("PARAM_SHUFFLE", PARAM_SHUFFLE);
    file = file.replaceAll("PARAM_VALIDATION_SPLIT", PARAM_VALIDATION_SPLIT);
    
    file = file.replaceAll("PARAM_VERBOSE", PARAM_VERBOSE);
    
//    console.log("===========");
//    console.log(file);
//    console.log("===========");
    //model.add(Dense(PARAM_LAYER2_NUM_NODES, activation=PARAM_LAYER2_ACTIVATION_FUNCTION))
    
    //adding the layers
    var notebook = JSON.parse(file);
    console.log(notebook);
    console.log(notebook.cells);

    //change dataset lines
    
    var datasetCell = notebook.cells.filter(function(cell){
        if(cell.metadata.id == "_-esyj4bPAfm"){
            return true;
        }
        else{
            return false;
        }
    });
    var datasetCellIndex = notebook.cells.indexOf(datasetCell);
    
    //edit lines
    datasetCell[0].source[0] = dataline1 + "\n";
    datasetCell[0].source.push(dataline2 + "\n");
    
    //end of dataset cell
    
    //filter out layers cell
    var layersCell = notebook.cells.filter(function(cell){
        if(cell.metadata.id == "M1oQpPuRxKbn"){
            return true;
        }
        else{
            return false;
        }
    });
    
    //input layer
//    layersCell.
    //todo change action function to activation
    var inputLayer = "model.add(Dense(PARAM_NUM_NODES, input_shape = ("+NUM_FEATURES+", ), activation=PARAM_ACTIVATION))";
    inputLayer = inputLayer.replaceAll("PARAM_NUM_NODES", layers[0].numNodes);
    inputLayer = inputLayer.replaceAll("PARAM_ACTIVATION", layers[0].activation);
    
    layersCell[0].source[0] = inputLayer + "\n";
    
    for(var i = 1; i < layers.length - 1; i++){
        var currentLayer = "model.add(Dense(PARAM_NUM_NODES, activation=PARAM_ACTIVATION))";
        currentLayer = currentLayer.replaceAll("PARAM_NUM_NODES", layers[i].numNodes);
        currentLayer = currentLayer.replaceAll("PARAM_ACTIVATION", layers[i].activation);
        layersCell[0].source.push(currentLayer + "\n");
    }
    
    var outputLayer = "model.add(Dense("+NUM_CLASSES+", activation=PARAM_OUTPUT_ACTIVATION))";
    outputLayer = outputLayer.replaceAll("PARAM_OUTPUT_ACTIVATION", PARAM_OUTPUT_ACTIVATION);
    layersCell[0].source.push(outputLayer + "\n");
    //end of layers
    
    
    console.log(notebook);
    
    var exportFile = JSON.stringify(notebook);
    
    console.log("FINAL NOTEBOOK:");
    console.log(exportFile);
    
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'template.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}