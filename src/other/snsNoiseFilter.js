function snsNoiseFilter(alphaValue, betaValue) {
    
    this.alpha = alphaValue;
    if (this.alpha === undefined) {
        this.alpha = 1.8;
    }
    this.beta = betaValue;
    if (this.beta === undefined) {
        this.beta = 0.03;
    }
    this.noise;
    this.noiseSum = 0;
    var sumFunction = function(a, b) {
        return a + b;
    };

    this.getNoise = function(input) {
        if (this.noiseSum == 0) {
            this.noise = input;
            this.noiseSum = this.noise.reduce(sumFunction, 0);
            return this.noise;
        }
        var inputSum = input.reduce(sumFunction, 0);
        var xnr = inputSum / this.noiseSum;
        if (xnr > this.alpha) {
            return this.noise;
        }
        var oneMinusBetaFactor = 1 - this.beta;
        for (var i = 0; i < input.length; i++) {
            this.noise[i] = oneMinusBetaFactor * this.noise[i] + this.beta * input[i];
        }
        this.noiseSum = oneMinusBetaFactor * inputSum + this.beta * this.noiseSum;
        return this.noise;
    };
}

export default snsNoiseFilter;