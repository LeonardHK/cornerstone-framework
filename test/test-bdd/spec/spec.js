describe('Cornerstone event extend test', function() {

    describe('widget-button', function() {

        describe('single toggle button', function() {
            var sTgBtn;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    sTgBtn = new WidgetButton({
                        el: '#single-toggle-button'
                    });
                    sTgBtn.render().$el.on('click', function() {
                        $(this).button('toggle');
                    });
                    expect(sTgBtn).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('버튼 클릭시 toggleOn 이벤트가 발생해야 한다', function(done) {
                sTgBtn.$el.on('toggleOn.cs.button', function(e) {
                    console.log('싱글 토글 버튼 toggleOn 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOn');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있어야 한다.', function() {
                expect(sTgBtn.$el.hasClass('active')).to.be.true;
            });

            it('이미 토글되어 있는 버튼 클릭시 toggleOff 이벤트가 발생해야 한다.', function(done) {
                sTgBtn.$el.on('toggleOff.cs.button', function(e) {
                    console.log('싱글 토글 버튼 toggleOff 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.equal('toggleOff');
                    done();
                }).click();
            });

            it('toggleOn 이벤트 발생 후 엘레멘트가 .active 가지고 있지 않아야 한다.', function() {
                expect(sTgBtn.$el.hasClass('active')).to.not.be.true;
            });
        });

        describe('radio button', function() {
            var radio;
            var radioLabel0, radioLabel1, radioLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    radio = new WidgetButton({
                        el: '#radio-toggle'
                    });
                    radio.render();
                    radioLabel0 = radio.$el.find('label:eq(0)');
                    radioLabel1 = radio.$el.find('label:eq(1)');
                    radioLabel2 = radio.$el.find('label:eq(2)');
                    expect(radio).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('첫번째 라디오 버튼 클릭 시 toggleOn 이벤트가 발생하여야 한다.', function(done) {
                radio.$el.on('toggleOn.cs.button', function(e, el) {
                    console.log('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                radioLabel0.click();
            });

            it('첫번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function() {
                expect(radioLabel0.hasClass('active')).to.be.ok;
                expect(radioLabel1.hasClass('active')).to.not.be.ok;
                expect(radioLabel2.hasClass('active')).to.not.be.ok;
            });

            it('두번째 라디오 버튼을 클릭 시 toggleOff와 toggleOn이 동시에 발생하여야 한다.', function(done) {
                radio.$el.on('toggleOff.cs.button', function(e, el) {
                    console.log('toggleOff 발생', e, el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                });
                radioLabel1.click();
            });

            it('두번째 라디오 버튼은 .active를 가져야하며 나머지는 .active를 가지면 안된다.', function() {
                expect(radioLabel0.hasClass('active')).to.not.be.ok;
                expect(radioLabel1.hasClass('active')).to.be.ok;
                expect(radioLabel2.hasClass('active')).to.not.be.ok;
            });

            it('두번째 라디오 버튼 다시 클릭했을때 두번째 라디오 버튼은 .active를 유지야 해야 하며 나머지는 .active를 가지면 안된다.', function() {
                radioLabel1.click();
                expect(radioLabel0.hasClass('active')).to.not.be.ok;
                expect(radioLabel1.hasClass('active')).to.be.ok;
                expect(radioLabel2.hasClass('active')).to.not.be.ok;
            });
        });

        describe('checkbox', function() {

            var checkbox;
            var checkLabel0, checkLabel1, checkLabel2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-button'], function(WidgetButton) {
                    checkbox = new WidgetButton({
                        el: '#check-toggle-1'
                    });
                    checkbox.render();
                    checkLabel0 = checkbox.$el.find('label:eq(0)');
                    checkLabel1 = checkbox.$el.find('label:eq(1)');
                    checkLabel2 = checkbox.$el.find('label:eq(2)');
                    expect(checkbox).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('첫번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 한다.', function(done) {
                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    console.log('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('첫번째 체크 박스가 .active를 가져야 하며 나머지는 .active를 가지면 안된다.', function() {
                expect(checkLabel0.hasClass('active')).to.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('선택된 첫번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 한다.', function(done) {
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    console.log('toggleOff 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    done();
                });
                checkLabel0.click();
            });

            it('.active를 가진 체크박스가 존재하면 안된다.', function() {
                expect(checkLabel0.hasClass('active')).to.not.be.ok;
                expect(checkLabel1.hasClass('active')).to.not.be.ok;
                expect(checkLabel2.hasClass('active')).to.not.be.ok;
            });

            it('세번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 해당 체크박스만 .active를 가져야 한다..', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    console.log('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.not.be.ok;
                    expect(checkLabel2.hasClass('active')).to.be.ok;
                    done();
                });
                checkLabel2.click();
            });

            it('두번째 체크 박스를 클릭했을 때 toggleOn 이벤트가 발생하여야 하고 두번째, 세번째 체크박스가 .active를 가져야 한다.', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');

                checkbox.$el.on('toggleOn.cs.button', function(e, el) {
                    console.log('toggleOn 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOn');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.be.ok;
                    expect(checkLabel2.hasClass('active')).to.be.ok;
                    done();
                });
                checkLabel1.click();
            });

            it('세번째 체크 박스를 클릭했을 때 toggleOff 이벤트가 발생하여야 하고 두번째 체크박스만 .active를 가져야 한다.', function(done) {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                // 
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    console.log('toggleOff 발생', el);
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('toggleOff');
                    expect(el).to.not.be.undefined;
                    expect(checkLabel0.hasClass('active')).to.not.be.ok;
                    expect(checkLabel1.hasClass('active')).to.be.ok;
                    expect(checkLabel2.hasClass('active')).to.not.be.ok;
                    done();
                });
                checkLabel2.click();
            });

            it('기존 테스트용 이벤트 리스너를 초기화 한다.', function() {
                checkbox.$el.off('toggleOn.cs.button').off('toggleOff.cs.button');
                checkbox.$el.on('toggleOff.cs.button', function(e, el) {
                    console.log('toggleOff 발생', el);
                }).on('toggleOn.cs.button', function(e, el) {
                    console.log('toggleOn 발생', el);
                });
            });
        });

        describe('carousel', function() {
            var cs;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-carousel'], function(WidgetCarousel) {
                    cs = new WidgetCarousel({
                        el: '#carousel-example-generic'
                    });
                    cs.render();
                    expect(cs).to.be.an.instanceof(Backbone.View);
                    $('#btnCsStart').click(function() {
                        cs.$el.carousel('cycle')
                    });
                    done();
                });
            });

            it('케로셀이 플레이 될때 play 이벤트가 발생하여야 한다.', function(done) {
                cs.$el.on('play.cs.carousel', function(e) {
                    console.log('play.cs.carousel 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('play');
                    done();
                }).carousel('pause');
                this.timeout(2000);
                setTimeout(function() {
                    cs.$el.carousel('cycle');
                }, 1000);
            });

            it('케로셀이 멈출 때 pause 이벤트가 발생하여야 한다.', function(done) {
                cs.$el.on('pause.cs.carousel', function(e) {
                    console.log('pause.cs.carousel 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('pause');
                    done();
                });
                this.timeout(2000);
                setTimeout(function() {
                    cs.$el.carousel('pause');
                }, 1000);
            });
        });

        describe('widget-tooltip', function() {
            var tooltips;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-tooltip'], function(WidgetTooltip) {
                    tooltips = new WidgetTooltip({
                        el: '[data-toggle=tooltip]'
                    });
                    tooltips.render();
                    expect(tooltips).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });


            it('첫번째 버튼에 마우스를 오버하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
                tooltips.$el.each(function() {
                    $(this).on('show.bs.tooltip', function(e) {
                        console.log('show.bs.tooltip 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('show');
                    }).on('shown.bs.tooltip', function(e) {
                        console.log('shown.bs.tooltip 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('shown');
                        done();
                    });
                });
                $(tooltips.$el[0]).mouseover();
            });

            it('첫번째 버튼에 마우스 오버를 해제하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {

                tooltips.$el.each(function() {
                    $(this).on('hide.bs.tooltip', function(e) {
                        console.log('hide.bs.tooltip 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('hide');
                    }).on('hidden.bs.tooltip', function(e) {
                        console.log('hidden.bs.tooltip 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('hidden');
                        done();
                    });
                });
                $(tooltips.$el[0]).mouseout();
            });

            it('세번째 버튼에 마우스 오버 및 해제시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function(done) {
                $(tooltips.$el[3]).off('show.bs.tooltip').off('shown.bs.tooltip').off('hide.bs.tooltip').off('hidden.bs.tooltip');
                $(tooltips.$el[3]).on('show.bs.tooltip', function(e) {
                    console.log('show.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.bs.tooltip', function(e) {
                    console.log('shown.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                }).on('hide.bs.tooltip', function(e) {
                    console.log('hide.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hide');
                }).on('hidden.bs.tooltip', function(e) {
                    console.log('hidden.bs.tooltip 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hidden');
                    done();
                }).mouseover().mouseout();
            });
        });

        describe('widget-popover', function() {
            var popovers;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-popover'], function(WidgetPopover) {
                    popovers = new WidgetPopover({
                        el: '[data-toggle=popover]'
                    });
                    popovers.render();
                    expect(popovers).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });

            it('첫번째 버튼을 클릭하면 show,shown 이벤트가 발생하여야 한다.', function(done) {
                popovers.$el.each(function() {
                    $(this).on('show.bs.popover', function(e) {
                        console.log('show.bs.popover 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('show');
                    }).on('shown.bs.popover', function(e) {
                        console.log('shown.bs.popover 발생');
                        e.preventDefault();
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('shown');
                        done();
                    });
                });
                $(popovers.$el[0]).click();
            });

            it('첫번째 버튼을 다시 클릭하면 hide,hidden 이벤트가 발생하여야 한다.', function(done) {

                popovers.$el.each(function() {
                    $(this).on('hide.bs.popover', function(e) {
                        console.log('hide.bs.popover 발생');
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('hide');
                    }).on('hidden.bs.popover', function(e) {
                        console.log('hidden.bs.popover 발생');
                        e.preventDefault();
                        expect(e).to.be.an.instanceof($.Event);
                        expect(e.type).to.be.equal('hidden');
                        done();
                    });
                });
                $(popovers.$el[0]).click();
            });

            it('세번째 버튼에 클릭 2회시 이벤트가 순서대로 발생하여야 한다. show -> shown -> hide -> hidden', function(done) {
                $(popovers.$el[2]).off('show.bs.popover').off('shown.bs.popover').off('hide.bs.popover').off('hidden.bs.popover');
                $(popovers.$el[2]).on('show.bs.popover', function(e) {
                    console.log('show.bs.popover 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('show');
                }).on('shown.bs.popover', function(e) {
                    console.log('shown.bs.popover 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('shown');
                }).on('hide.bs.popover', function(e) {
                    console.log('hide.bs.popover 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hide');
                }).on('hidden.bs.popover', function(e) {
                    console.log('hidden.bs.popover 발생');
                    expect(e).to.be.an.instanceof($.Event);
                    expect(e.type).to.be.equal('hidden');
                    done();
                }).click().click();
            });
        });

        describe('widget-rageinput', function() {

            var input_0, input_1, input_2;

            it('requirejs를 이용하여 모듈로 로드하고, Backbone.View의 인스턴스여야 한다.', function(done) {
                require(['widget-rangeinput'], function(WidgetRangeInput) {
                    input_0 = new WidgetRangeInput({
                        el: 'input[type="range"]:eq(0)'
                    });
                    input_1 = new WidgetRangeInput({
                        el: 'input[type="range"]:eq(1)',
                        'progress': true
                    });
                    input_2 = new WidgetRangeInput({
                        el: '#range3',
                        'inputShow': true
                    });
                    input_0.render();
                    input_1.render();
                    input_2.render();
                    expect(input_0).to.be.an.instanceof(Backbone.View);
                    expect(input_1).to.be.an.instanceof(Backbone.View);
                    expect(input_2).to.be.an.instanceof(Backbone.View);
                    done();
                });
            });


            it('start, move, end 이벤트', function() {
            	$('input[data-plugin="rangeinput"], #range3').on('start.cs.rangeInput', function(e) {
                console.log('start', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('start');
            }).on('move.cs.rangeInput', function(e) {
                console.log('move', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('move');
            }).on('end.cs.rangeInput', function(e) {
                console.log('end', e);
                expect(e).to.be.an.instanceof($.Event);
                expect(e.type).to.be.equal('end');
            });
                // console.log( input_0.$el );
                // input_0.$el.on('start.cs.rangeInput', function(e) {
                //         console.log('start', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('start');
                //     }).on('move.cs.rangeInput', function(e) {
                //         console.log('move', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('move');
                //     }).on('end.cs.rangeInput', function(e) {
                //         console.log('end', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('end');
                //     })
                // inputArr.each(function() {
                // 	console.log(this.$el);
                //     this.$el.on('start.cs.rangeInput', function(e) {
                //         console.log('start', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('start');
                //     }).on('move.cs.rangeInput', function(e) {
                //         console.log('move', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('move');
                //     }).on('end.cs.rangeInput', function(e) {
                //         console.log('end', e);
                //         expect(e).to.be.an.instanceof($.Event);
                //         expect(e.type).to.be.equal('end');
                //     })
                // });

                // TODO 강제로 핸들을 드래그 시키는 방법이 필요하다.
            });
        });

    });

});