function readFormula(fileName) {
    var fs = require ('fs');
    let content = fs.readFileSync(fileName, 'utf8');
    let contentArray = content.split('\n');
    var clausulas = readClauses(contentArray);
    var variaveis = readVariables(clausulas);
    var specOk = checkProblemSpecification(contentArray, clausulas, variaveis);
    var result = {'clauses': [], 'variables': []};
    if(specOk) {
        result.clauses = clausulas;
        result.variables = variaveis;
    }
    return result;
}

function readClauses(contentArray) {
    var clauses = [];
    let x = 0;
    for(let i = 0; i < contentArray.length; i++) {
        if((contentArray[i].charAt(0) !== 'p') && (contentArray[i].charAt(0) !== 'c') && (contentArray[i].charAt(0) !== '')) {
            clauses[x] = contentArray[i];
            x++;
        }
    }
    clauses = clauses.join(' ');
    clauses = clauses.split(' 0');
    clauses.pop();
    for(let i3 = 0; i3 < clauses.length; i3++) {
        clauses[i3] = clauses[i3].split(' ');
    }
    for(let i4 = 1; i4 < clauses.length; i4++) {
        clauses[i4].shift();
    }
    return clauses;
}

function readVariables(clausulas) {
    let max = 0;
    for(let i = 0; i < clausulas.length; i++) {
        for(let i2 = 0; i2 < clausulas[i].length; i2++) {
            if(clausulas[i][i2].charAt(0) === '-') {
                clausulas[i][i2] = clausulas[i][i2] * (-1);
                clausulas[i][i2] = clausulas[i][i2].toString();
            }
            if(clausulas[i][i2] > max) {
                max = clausulas[i][i2];
            }
        }
    }
    var arrayAtributos = [];
    for(let i3 = 0; i3 < max; i3++) {
        arrayAtributos [i3] = 0;
    }
    return arrayAtributos;
}

function checkProblemSpecification(contentArray, clausulas, variaveis) {
    for(let i = 0; i < contentArray.length; i++) {
        if(contentArray[i].charAt(0) === 'p') {
            var linha = contentArray[i];
        }
    }
    linha = linha.substring(6, linha.length);
    var splitado = linha.split(' ');
    var numeroVariables = splitado[0];
    var numeroClauses = splitado[1];
    var tamanhoVariaveis = variaveis.length;
    var tamanhoClausulas = clausulas.length;
    var boolVariables = false;
    var boolClauses = false;
    tamanhoVariaveis = tamanhoVariaveis.toString();
    tamanhoClausulas = tamanhoClausulas.toString();
    if(tamanhoVariaveis === numeroVariables) {
        boolVariables = true;
    }
    if(tamanhoClausulas === numeroClauses) {
        boolClauses = true;
    }
    if((boolVariables === true) && (boolClauses === true)) {
        return true;
    }else {
        return false;
    }
}

function nextAssignment(currentAssignment) {
    var currentAssignmentConcatenado = currentAssignment[0];
    for(let i = 1; i < currentAssignment.length; i++) {
        currentAssignmentConcatenado = currentAssignmentConcatenado.concat(currentAssignment[i]);
    }
    var nextAssignment = bin2dec(currentAssignmentConcatenado);
    nextAssignment = nextAssignment + 1;
    nextAssignment = dec2bin(nextAssignment);
    var nextArrayAssignment = [];
    nextArrayAssignment = nextAssignment.split('');
    if(currentAssignmentConcatenado.length !== nextArrayAssignment.length) {
        var complemento = (currentAssignmentConcatenado.length - nextArrayAssignment.length);
        var arrayComplemento = [];
        if(complemento > 1) {
            for(let i2 = 0; i2 < complemento - 1; i2++) {
                arrayComplemento[i2] = '0';
                arrayComplemento = arrayComplemento.concat(arrayComplemento[i2]);
            }
            nextArrayAssignment = arrayComplemento.concat(nextArrayAssignment);
        }else {
            arrayComplemento = ['0'];
            nextArrayAssignment = arrayComplemento.concat(nextArrayAssignment);
        }
    }
    return nextArrayAssignment;
}

function bin2dec(num){
    return num.split('').reverse().reduce(function(x, y, i){
        return (y === '1') ? x + Math.pow(2, i) : x;
    }, 0);
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

function doSolve(clauses, assignment) {
    var isSat = false;
    while((!isSat && nextAssignment !== undefined)) {
        if(isSat !== false) {

        }else {

        }
        assignment = nextAssignment(assignment);
    }
    var result = {'isSat': isSat, satisfyingAssignment: null};
    if(isSat) {
        result.satisfyingAssignment = assignment;
    }
    return result;
}

exports.solve = function (fileName) {
    var formula = readFormula(fileName);
    var result = doSolve(formula.clauses, formula.variables);
    return result;
}